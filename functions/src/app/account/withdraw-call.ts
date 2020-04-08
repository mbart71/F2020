import { Wid, logAndCreateError, PlayerImpl, validateAccess, Transaction } from "../../lib";
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';


const validateBalance = (player: PlayerImpl): void => {

  if ((player.balance || 0) - 20 < 0) {
    throw logAndCreateError('failed-precondition', `${player.displayName} has insufficient funds. Balance: ${(player.balance || 0).toFixed(2)}`)
  }

}

export const withdraw = functions.region('europe-west1').https.onCall(async(data, context) => {
  return validateAccess(context.auth?.uid, 'bankadmin')
    .then(player => withdraw(player))
    .then(() => true)
    .catch(errorMessage => {
      throw logAndCreateError('internal', errorMessage)
    });
});

const withdraw = async (player: PlayerImpl) => {
  const db = admin.firestore();
  const doc = db.doc(`${player.uid}`) as admin.firestore.DocumentReference<Wid>;
  const user = (await doc.get()).data();
  const newBalance = data.number.amount - player.balance
  const amount = context.number.amount
  
  if (!user) {
    throw logAndCreateError('not-found', `No user exists for uid: ${player.uid} `);
  }

  validateBalance(player);

  const transactions = db.collection('transaction');
  return db.runTransaction(transaction => {
    transaction.create(transactions.doc(), <Transaction> {
      date: new Date(),
      amount: amount,
      message: `Hævet af bankadmin ${amount}`,
      to: player.uid
    })
    return Promise.resolve('Deposit request submitted');
  })

}
