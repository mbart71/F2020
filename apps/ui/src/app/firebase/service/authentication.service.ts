import { Injectable } from "@angular/core";
import * as firebase from 'firebase';
import { Observable,from, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly googleProvider: any;
  private _user$ = new ReplaySubject<firebase.User | null>(1);

  get user$(): Observable<firebase.User> {
    return this._user$.asObservable();
  }

  constructor() {
    this.googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().onAuthStateChanged(user => this._user$.next(user));
  }

  signInWithGoogle(): Observable<firebase.auth.UserCredential> {
    firebase.auth().signInWithRedirect(this.googleProvider);
    return from(firebase.auth().getRedirectResult());
  }

  signOut(): Observable<void> {
    return from(firebase.auth().signOut());
  }
}
