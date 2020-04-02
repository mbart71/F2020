// import { firestoreUtils } from '@f2020/data';
import { firestoreUtils } from './firestore-utils';
import {firestore} from 'firebase-admin'
import { ISeason } from '@f2020/data';
export const converter = {
  toFirestore(season: ISeason): firestore.DocumentData {
    return firestoreUtils.convertDateTimes(season);
  },
  fromFirestore(
    snapshot: firestore.QueryDocumentSnapshot,
  ): ISeason {
    const data = snapshot.data()!;
    return firestoreUtils.convertTimestamps(data);
  }
};
