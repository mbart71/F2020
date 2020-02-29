import {firestore} from 'firebase-admin'
import { IRace } from '@f2020/data';
import { firebaseUtils } from '../firebase-utils';
export const converter = {
  toFirestore(race: IRace): firestore.DocumentData {
    return firebaseUtils.convertDateTimes(race);
  },
  fromFirestore(
    snapshot: firestore.QueryDocumentSnapshot,
  ): IRace {
    const data = snapshot.data()!;
    return firebaseUtils.convertTimestamps(data);
  }
};
