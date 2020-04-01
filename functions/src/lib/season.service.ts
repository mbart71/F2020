import { converter } from './';
import * as admin from 'firebase-admin';
import { ISeason } from './model';

let _currentSeason: Promise<ISeason>;

export const currentSeason = (): Promise<ISeason> => {
  if (_currentSeason) {
    return _currentSeason;
  }
  _currentSeason = admin.firestore().collection(`season`)
  .where('current', '==', true)
  .withConverter<ISeason>(converter.timestamp)
  .get()
  .then(snapshot => {
    if (snapshot.docs.length === 1) {
      return snapshot.docs[0].data();
    } 
    return Promise.reject(`Found ${snapshot.docs.length} with state open`);
  })
  return _currentSeason;
};
