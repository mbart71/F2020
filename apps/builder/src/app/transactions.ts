import { environment } from '../environments/environment';
import { readUser } from './mysql/account';
import { Transaction } from './model/mysq.model';
import { firebaseApp } from './firebase';
import { WriteResult } from '@google-cloud/firestore';

export const buildTransactions = async (): Promise<number> => {
  const db = firebaseApp.datebase;
  const mysqldata = (await readUser())
  //const mysqldata1 = JSON.parse(mysqldata1) 
  const transactionCollection = db.collection('transactions');

  return db.runTransaction(transaction => {
    mysqldata.forEach(docKey =>
        transaction.set(transactionCollection.add(docKey).then(documentReference => {
            console.log(`Added document with name: ${documentReference.id}`)
        })),
        );
    return Promise.resolve(mysqldata.length);
  });
}