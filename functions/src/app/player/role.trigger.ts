import * as functions from 'firebase-functions';
  
export const setDefaultRole = functions.region('europe-west1').firestore.document('players/{userId}')
    .onCreate(async (snap, context) => {  
     console.log(snap.ref.listCollections);   
     return snap.ref.create({
        role: ['anonymouse']
     })
 });    