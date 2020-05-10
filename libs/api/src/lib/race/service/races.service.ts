import { IQualifyResult } from './../../../../../../functions/src/lib/model/race.model';
import { Inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Bid, firestoreUtils, IRace, IRaceResult, mapper, Player } from '@f2020/data';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GoogleFunctions } from '../../firebase';
import { SeasonService } from './../../season/service/season.service';
import { ErgastService } from '../../service/ergast.service';

@Injectable({
  providedIn: 'root',
})
export class RacesService {

  constructor(
    private afs: AngularFirestore, 
    private ergastService: ErgastService,
    @Inject(GoogleFunctions) private functions: () => firebase.functions.Functions) {

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

  getQualify(seasonId: string | number, round: number): Observable<IQualifyResult> {
    return this.ergastService.get<IQualifyResult>(`${seasonId}/${round}/qualifying.json`, ergastData => mapper.qualifyResult(ergastData.MRData.RaceTable.Races[0]));
  }


  async submitBid(bid: Bid): Promise<true> {
    return this.functions().httpsCallable('submitBid')(bid).then(() => true);
  }

  async submitResult(result: Bid): Promise<true> {
    return this.functions().httpsCallable('submitResult')(result).then(() => true);
  }
}
