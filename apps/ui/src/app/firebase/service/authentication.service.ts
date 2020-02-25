import { Injectable } from "@angular/core";
import * as firebase from 'firebase';
import { Observable,from, ReplaySubject } from 'rxjs';

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
      this._player$.next(user)
      console.log(user);
    });
  }

  signInWithGoogle(): Observable<firebase.auth.UserCredential> {
    firebase.auth().signInWithRedirect(this.googleProvider);
    return from(firebase.auth().getRedirectResult());
  }

  signOut(): Observable<void> {
    return from(firebase.auth().signOut());
  }
}
