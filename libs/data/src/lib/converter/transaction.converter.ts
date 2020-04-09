import { firestore } from 'firebase';
import { firestoreUtils } from '../firestore-utils';
import { Transaction } from '../model';
export const converter = {
  toFirestore(transaction: Transaction): firestore.DocumentData {
    return firestoreUtils.convertDateTimes(transaction);
  },
  fromFirestore(
    snapshot: firestore.QueryDocumentSnapshot,
  ): Transaction {
    const data = snapshot.data()!;
    return firestoreUtils.convertTimestamps(data);
  }
};
