import * as functions from 'firebase-functions';


export const setDefaultRolese = functions.region('europe-west1').firestore.document('players/{userId}')
    .onCreate(async (snap, context) => {  
     const newUser:any = snap.data();
     console.log(newUser?.displayName,' with uid ', newUser?.uid, 'has signed up, assigning a defaultrole');   
     return snap.ref.update({
        role: ['anonymous']
     })
 });    