import * as functions from 'firebase-functions';


export const setDefaultRole = functions.region('europe-west1').firestore.document('players/{userId}')
    .onCreate(async (snap, context) => {  
     const newuser:any = snap.data();
     console.log(newuser?.displayName,' with uid ', newuser?.uid, 'has signed up, assigning a defaultrole');   
     return snap.ref.update({
        role: ['anonymous']
     })
 });    