import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from "@angular/core";
import { Player } from '@f2020/data';
import { Observable } from 'rxjs';
import { PlayerService } from '@f2020/player';
import { switchMap, mapTo, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayersApiService {
  constructor(private afs: AngularFirestore) {
  }

  updatePlayer(uid: string, player: Partial<Player>): Promise<void> {
    return this.afs.doc(`${PlayerService.playersURL}/${uid}`).update(player);
  }
}