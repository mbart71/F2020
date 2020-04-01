import { PlayerImpl } from './auth.model';
// import { firestoreUtils } from '@f2020/data';
import { firestoreUtils } from './firestore-utils';
import {firestore} from 'firebase-admin'

export const converter = {
  toFirestore(player: PlayerImpl): firestore.DocumentData {
    return firestoreUtils.convertDateTimes(player);
  },
  fromFirestore(
    snapshot: firestore.QueryDocumentSnapshot,
  ): PlayerImpl {
    const data = snapshot.data();
    return new PlayerImpl(firestoreUtils.convertTimestamps(data));
  }
};
