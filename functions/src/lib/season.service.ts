import { converter } from './';
import * as admin from 'firebase-admin';
import { ISeason } from './model';

const firestore = admin.firestore().collection(`season`)
export const currentSeason: Promise<ISeason> = firestore
  .where('current', '==', true)
  .withConverter<ISeason>(converter.timestamp)
  .get()
  .then(snapshot => {
    if (snapshot.docs.length === 1) {
      return snapshot.docs[0].data();
    } 
    return Promise.reject(`Found ${snapshot.docs.length} with state open`);
  });
