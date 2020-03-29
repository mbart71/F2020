import { IRace } from '@f2020/data';
import { firestore } from 'firebase-admin';
import { firestoreUtils } from './firestore-utils';
export const converter = {
  toFirestore(race: IRace): firestore.DocumentData {
    return firestoreUtils.convertDateTimes(race);
  },
  fromFirestore(
    snapshot: firestore.QueryDocumentSnapshot,
  ): IRace {
    const data = snapshot.data()!;
    return firestoreUtils.convertTimestamps(data);
  }
};
