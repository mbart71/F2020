import {firestore} from 'firebase-admin'
import { ISeason } from '@f2020/data';
import { firebaseUtils } from '../firebase-utils';
export const converter = {
  toFirestore(season: ISeason): firestore.DocumentData {
    return firebaseUtils.convertDateTimes(season);
  },
  fromFirestore(
    snapshot: firestore.QueryDocumentSnapshot,
  ): ISeason {
    const data = snapshot.data()!;
    return firebaseUtils.convertTimestamps(data);
  }
};
