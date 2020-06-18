import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from "@angular/core";
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

export const GoogleFunctions = new InjectionToken<() => firebase.functions.Functions>('GOOGLE_FUNCTIONS')

@NgModule({
  imports: [CommonModule],
  providers: [{
    provide: GoogleFunctions,
    useFactory: () => () => FirebaseModule.functions
  }]
})
export class FirebaseModule {

  static functions: firebase.functions.Functions;

  constructor() {
    FirebaseModule.functions = firebase.app().functions('europe-west1');
  }
  
  static setupMessaging(pubKey: string): void {
    const messaging = firebase.messaging();
    messaging.usePublicVapidKey(pubKey);
  }
}
