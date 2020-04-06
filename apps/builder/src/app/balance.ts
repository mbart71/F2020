import { firestoreUtils } from './converter/firestore-utils';
import { firebaseApp } from './firebase';
import { readBalance} from './mysql/account';

export const buildBalance= async (account: number): Promise<number> => {
  const db = firebaseApp.datebase;
  const rows = (await readBalance(account))
  
  const players = db.collection('players');

  return db.runTransaction(transaction => {
      rows.forEach(docKey =>   transaction.set(players.doc(docKey.uid).update({balance: docKey.amount}), firestoreUtils.convertTimestamps(docKey)));
      return Promise.resolve(rows.length);
    });
}