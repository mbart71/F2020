import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Player } from '@f2020/data';
import { AngularFirestore } from '@angular/fire/firestore';
import { first, map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private afs: AngularFirestore) {
    firebase.auth().getRedirectResult().then(result => {
      if (result && result.user) {
        this.updateBaseInformation(result.user).toPromise().then(() => console.log('Base information updated'));
      }
    });
  }

  updateBaseInformation(player: Player): Observable<void> {
    const _player: Player = {
      uid: player.uid,
      displayName: player.displayName,
      email: player.email,
      photoURL: player.photoURL
    };
    const doc = this.afs.collection('player').doc(player.uid);
    return doc.get().pipe(
      first(),
      switchMap(snapshot => snapshot.exists ? doc.update(_player) : doc.set(_player)),
    );
  }
}
