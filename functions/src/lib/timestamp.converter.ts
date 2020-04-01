import { firestoreUtils } from './firestore-utils';
import {firestore} from 'firebase-admin'

export const converter = {
  toFirestore<T>(data: T): firestore.DocumentData {
    return firestoreUtils.convertDateTimes(data);
  },
  fromFirestore<T>(
    snapshot: firestore.QueryDocumentSnapshot,
  ): T {
    const data = snapshot.data();
    return firestoreUtils.convertTimestamps(data);
  }
};
