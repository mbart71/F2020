import { CommonModule } from '@angular/common';
import { InjectionToken, ModuleWithProviders, NgModule } from "@angular/core";
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

export const GoogleFunctions = new InjectionToken<() => firebase.functions.Functions>('GOOGLE_FUNCTIONS');
export const GoogleMessaging = new InjectionToken<() => firebase.messaging.Messaging>('GOOGLE_MESSAGING');

@NgModule({
  imports: [CommonModule],
})
export class FirebaseModule {

  static forRoot(pubKey: string): ModuleWithProviders {
    return {
      ngModule: FirebaseModule,
      providers: [
        {
          provide: GoogleFunctions,
          useFactory: () => firebase.app().functions('europe-west1')
        },
        {
          provide: GoogleMessaging,
          useFactory: () => {
            const messaging = firebase.messaging();
            messaging.usePublicVapidKey(pubKey);
            return messaging;
          }
        }
      ]
    };
  }

}
