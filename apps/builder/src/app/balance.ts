import { firestoreUtils } from './converter/firestore-utils';
import { firebaseApp } from './firebase';
import { readBalance} from './mysql/accountbalance';

export const buildBalance= async (account: number): Promise<number> => {
  const db = firebaseApp.datebase;
  const rows = (await readBalance(account))
  
  const players = db.collection('players');

  return db.runTransaction(transaction => {
      rows.forEach(({uid, amount}) => transaction.set(players.doc(uid).update({balance: amount}), firestoreUtils.convertDateTime()));
      return Promise.resolve(rows.length);
    }); 
}