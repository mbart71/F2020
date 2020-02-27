import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { from, Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly googleProvider: any;
  private _player$ = new ReplaySubject<firebase.UserInfo | null>(1);

  get player$(): Observable<firebase.UserInfo> {
    return this._player$.asObservable();
  }

  constructor() {
    this.googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().onAuthStateChanged(user => {
      this._player$.next({...user});
      // if (user && router.url.endsWith('login')) {
      //   router.navigate(['/']);
      // }
      console.log(user);
    });
  }

  signInWithGoogle(): Promise<void> {
    return firebase.auth().signInWithRedirect(this.googleProvider).then(_ => console.log('Signed in using google'));
  }

  signOut(): Observable<void> {
    return from(firebase.auth().signOut());
  }
}
