import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Player } from '@f2020/data';
import { AngularFirestore } from '@angular/fire/firestore';
import { first, switchMap } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {

  static readonly playersURL = 'players';

  constructor(private afs: AngularFirestore) {
    firebase.auth().getRedirectResult().then(result => {
      if (result && result.user) {
        this.updateBaseInformation(result.user).toPromise().then(() => console.log('Base information updated'));
      }
    });
    firebase.auth().onAuthStateChanged(user => {
      this._player$.next({ ...user });
      this.updateBaseInformation(user).toPromise().then(() => console.log('Base information updated'));
      console.log(user);
    });
  }

  private _player$ = new ReplaySubject<firebase.UserInfo | null>(1);

  get player$(): Observable<firebase.UserInfo> {
    return this._player$.asObservable();
  }

  signInWithGoogle(): Promise<void> {
    return firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider()).then(_ => console.log('Signed in using google'));
  }

  signInWithFacebook(): Promise<void> {
    return firebase.auth().signInWithRedirect(new firebase.auth.FacebookAuthProvider()).then(_ => console.log('Signed in using facebook'));
  }

  signOut(): Promise<void> {
    return firebase.auth().signOut();
  }

  private updateBaseInformation(player: Player): Observable<void> {
    const _player: Player = {
      uid: player.uid,
      displayName: player.displayName,
      email: player.email,
      photoURL: player.photoURL,
    };
    const doc = this.afs.doc(`${PlayerService.playersURL}/${player.uid}`);
    return doc.get().pipe(
      switchMap(snapshot => snapshot.exists ? doc.update(_player) : doc.set(_player)),
      first(),
    );
  }
}
