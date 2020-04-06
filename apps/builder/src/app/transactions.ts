import { firestoreUtils } from './converter/firestore-utils';
import { firebaseApp } from './firebase';
import { readUser, readUserNullNegative, readUserNullPositive } from './mysql/account';

export const buildTransactions = async (): Promise<number> => {
  const db = firebaseApp.datebase;
  const rows = (await readUser())
  
  const transactions = db.collection('transactions');

  const chuncks = (Array.from({ length: (rows.length / 500) + 1 }, (_, index) => index)
    .map(index => rows.slice(index * 500, (index+1)*500))
  );  

  return Promise.all(chuncks.map(chunck => {
    return db.runTransaction(transaction => {
      chunck.forEach(docKey => transaction.set(transactions.doc(), firestoreUtils.convertTimestamps(docKey)));
      return Promise.resolve(rows.length);
    });
  })).then(() => rows.length)
}

export const buildTransactionsNullNegative = async (): Promise<number> => {
  const db = firebaseApp.datebase;
  const rows = (await readUserNullNegative())
  
  const transactions = db.collection('transactions');

  const chuncks = (Array.from({ length: (rows.length / 500) + 1 }, (_, index) => index)
    .map(index => rows.slice(index * 500, (index+1)*500))
  );  

  return Promise.all(chuncks.map(chunck => {
    return db.runTransaction(transaction => {
      chunck.forEach(docKey => transaction.set(transactions.doc(), firestoreUtils.convertTimestamps(docKey)));
      return Promise.resolve(rows.length);
    });
  })).then(() => rows.length)
}

export const buildTransactionsNullPositive = async (): Promise<number> => {
  const db = firebaseApp.datebase;
  const rows = (await readUserNullPositive())
  
  const transactions = db.collection('transactions');

  const chuncks = (Array.from({ length: (rows.length / 500) + 1 }, (_, index) => index)
    .map(index => rows.slice(index * 500, (index+1)*500))
  );  

  return Promise.all(chuncks.map(chunck => {
    return db.runTransaction(transaction => {
      chunck.forEach(docKey => transaction.set(transactions.doc(), firestoreUtils.convertTimestamps(docKey)));
      return Promise.resolve(rows.length);
    });
  })).then(() => rows.length)
}