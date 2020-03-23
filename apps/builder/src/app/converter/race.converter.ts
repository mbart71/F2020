import { firestoreUtils, IRace } from '@f2020/data';
// import { firestoreUtils } from './firestore-utils';
import { firestore } from 'firebase-admin';
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
