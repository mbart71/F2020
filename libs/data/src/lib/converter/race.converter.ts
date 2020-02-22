import { ISeason, IRace } from "../model";
import { firebaseUtils } from '../mapper';
import {firestore} from 'firebase-admin'
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
