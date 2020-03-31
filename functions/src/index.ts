import * as functions from 'firebase-functions';
import * as firebase from 'firebase-admin';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  firebase.initializeApp();
  firebase.credential;
  // console.log('sdfdsfdsfdsfsfd', firebase.auth().);
  
 response.send("Hello from Firebase!");
});
