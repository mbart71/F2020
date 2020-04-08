import { Dep, logAndCreateError, PlayerImpl, validateAccess, Transaction } from "../../lib";
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';


export const deposit = functions.region('europe-west1').https.onCall(async(data, context) => {
  return validateAccess(context.auth?.uid, 'admin')
    .then(player => deposit(player))
    .then(() => true)
    .catch(errorMessage => {
      throw logAndCreateError('internal', errorMessage)
    });
});

const deposit = async (player: PlayerImpl) => {
  const db = admin.firestore();
  const doc = db.doc(`${player.uid}`) as admin.firestore.DocumentReference<Dep>;
  const user = (await doc.get()).data();
  const newBalance = data.text.amount + player.balance
  const amount = data.text.amount 
  
  if (!user) {
    throw logAndCreateError('not-found', `No user exists for uid: ${player.uid} `);
  }

  const transactions = db.collection('transaction');
  return db.runTransaction(transaction => {
    transaction.update(doc, {balance: newBalance});
    transaction.create(transactions.doc(), <Transaction> {
      date: new Date(),
      amount: amount,
      message: `Indsat af admin ${amount}`,
      to: player.uid
    })
    return Promise.resolve('Deposit request submitted');
  })

}
