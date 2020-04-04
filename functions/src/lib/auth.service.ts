import { converter } from './auth.converter';
import { PlayerImpl } from './auth.model';
import * as admin from 'firebase-admin';


export const playersURL = 'players';

export const getUser = async (uid: string): Promise<PlayerImpl | undefined> => {
  return admin.firestore().doc(`${playersURL}/${uid}`).withConverter(converter).get().then(ref => ref.data());
}
