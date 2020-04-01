// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

import * as firebase from 'firebase-admin';

firebase.initializeApp();

export * from './app/bid/bid';
