import { converter } from './auth.converter';
import { PlayerImpl } from './auth.model';
import * as admin from 'firebase-admin';

const firestore = admin.firestore().collection(`player`)

export const getUser = async (uid: string): Promise<PlayerImpl | undefined> => {
  return firestore.doc(uid).withConverter(converter).get().then(ref => ref.data());
}

