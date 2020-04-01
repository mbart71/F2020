import { environment } from './../../environments/environment';
import { NgModule, InjectionToken, ModuleWithProviders } from "@angular/core";
import { CommonModule } from '@angular/common';

// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

export const GoogleFunctions = new InjectionToken<firebase.functions.Functions>('GOOGLE_FUNCTIONS')

@NgModule({
  imports: [CommonModule]
})
export class FirebaseModule {

  static forRoot(): ModuleWithProviders {
    console.log('Firebase initialized', environment.firebaseConfig);
    const app = firebase.initializeApp(environment.firebaseConfig);
    const functions = app.functions('europe-west1');
    return {
      ngModule: FirebaseModule,
      providers: [{
        provide: GoogleFunctions,
        useValue: functions
      }]
    }
  }
}
