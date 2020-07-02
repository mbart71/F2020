import { firestoreUtils } from '../firestore-utils';
import { Transaction } from '../model';
import * as firebase from 'firebase/app';
import 'firebase/firestore';


export const converter = {
  toFirestore(transaction: Transaction): firebase.firestore.DocumentData {
    return firestoreUtils.convertDateTimes(transaction);
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
  ): Transaction {
    const data = snapshot.data()!;
    return firestoreUtils.convertTimestamps(data);
  }
};
