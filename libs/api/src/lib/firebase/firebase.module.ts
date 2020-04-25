import { CommonModule } from '@angular/common';
import { InjectionToken, ModuleWithProviders, NgModule, Inject } from "@angular/core";
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

export const GoogleFunctions = new InjectionToken<firebase.functions.Functions>('GOOGLE_FUNCTIONS')

@NgModule({
  imports: [CommonModule],
  providers: [{
    provide: GoogleFunctions,
    useFactory: () => FirebaseModule.functions
  }]
})
export class FirebaseModule {

  static functions: firebase.functions.Functions;

  constructor() {
    FirebaseModule.functions = firebase.app('f1').functions('europe-west1');
  }
}
