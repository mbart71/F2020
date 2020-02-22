import { ISeason } from "../model";
import { firebaseUtils } from '../mapper';
import {firestore} from 'firebase-admin'
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
