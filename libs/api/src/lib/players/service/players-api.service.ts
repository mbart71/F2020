import { Inject, Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { Player } from '@f2020/data';
import { PlayerService } from '@f2020/player';
import { GoogleFunctions } from '../../firebase';

@Injectable({
  providedIn: 'root'
})
export class PlayersApiService {
  constructor(
    private afs: AngularFirestore,
    @Inject(GoogleFunctions) private functions: () => firebase.functions.Functions) {
  }

  updatePlayer(uid: string, player: Partial<Player>): Promise<void> {
    return this.afs.doc(`${PlayerService.playersURL}/${uid}`).update(player);
  }

  migrateAccount(uid: string, accountId: number): Promise<boolean> {
    return this.functions().httpsCallable('migrateAccount')({uid, accountId}).then(() => true);
  }
}