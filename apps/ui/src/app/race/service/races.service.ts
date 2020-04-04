import { SeasonService } from './../../season/service/season.service';
import { ErgastService } from './../../shared/service/ergast.service';
import { Injectable, Injector, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { firestoreUtils, IRace, Player, Bid, IRaceResult, mapper } from '@f2020/data';
import { map } from 'rxjs/operators';
import { GoogleFunctions } from '../../firebase';

@Injectable({
  providedIn: 'root',
})
export class RacesService {

  constructor(
    private afs: AngularFirestore, 
    private ergastService: ErgastService,
    @Inject(GoogleFunctions) private functions: firebase.functions.Functions) {

  }

  getRaces(seasonId: string): Observable<IRace[]> {
    return this.afs.collection<IRace>(`${SeasonService.seasonsURL}/${seasonId}/races`).valueChanges().pipe(
      map(firestoreUtils.convertTimestamps),
    );
  }

  getBids(seasonId: string, raceId: string): Observable<Bid[]> {
    return this.afs.collection<Bid>(`${SeasonService.seasonsURL}/${seasonId}/races/${raceId}/bids`).valueChanges().pipe(
      map(firestoreUtils.convertDateTimes),
    );
  }

  getBid(seasonId: string, raceId: string, uid: string): Observable<Bid> {
    return this.afs.doc<Bid>(`${SeasonService.seasonsURL}/${seasonId}/races/${raceId}/bids/${uid}`).valueChanges().pipe(
      map(firestoreUtils.convertDateTimes),
    );
  }

  updateBid(seasonId: string, raceId: string, player: Player, bid: Bid): Promise<void> {
    return this.afs.doc<Bid>(`${SeasonService.seasonsURL}/${seasonId}/races/${raceId}/bids/${player.uid}`).set({...bid, player: {
      uid: player.uid,
      displayName: player.displayName,
      photoURL: player.photoURL,
      email: player.email,
    }});
  }

  getResult(seasonId: string | number, round: number): Observable<IRaceResult> {
    return this.ergastService.get<IRaceResult>(`${seasonId}/${round}/results.json`, ergastData => mapper.raceResult(ergastData.MRData.RaceTable.Races[0]));
  }


  async submitBid(): Promise<true> {
    return this.functions.httpsCallable('submitBid')().then(() => true);
  }

  async submitResult(): Promise<true> {
    return this.functions.httpsCallable('submitResult')().then(() => true);
  }
}
