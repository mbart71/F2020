import { Injectable } from "@angular/core";
import * as firebase from 'firebase';
import { Observable,from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly googleProvider: any;

  constructor() {
    this.googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().onAuthStateChanged(console.log);
  }

  signInWithGoogle(): Observable<firebase.auth.UserCredential> {
    firebase.auth().signInWithRedirect(this.googleProvider);
    return from(firebase.auth().getRedirectResult());
  }

  signOut(): Observable<void> {
    return from(firebase.auth().signOut());
  }
}
