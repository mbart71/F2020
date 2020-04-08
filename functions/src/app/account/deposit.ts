import { logAndCreateError, PlayerImpl, validateAccess, Transaction } from "../../lib";
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';


const noNullsInArrayFn = (array: (string | null)[]): boolean => array.every(Boolean);
const uniqueDriversFn = (array: (string | null)[]): boolean => array.length === new Set(array).size;
const validArraysFn = (array: (string | null)[]): boolean => noNullsInArrayFn(array) && uniqueDriversFn(array);


/*
const validateBalance = (player: PlayerImpl): void => {

  if ((player.balance || 0) - 20 < -100) {
    throw logAndCreateError('failed-precondition', `${player.displayName} has insufficient funds. Balance: ${(player.balance || 0).toFixed(2)}`)
  }

}
*/
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
  const doc = db.doc(`${player.uid}`) as admin.firestore.DocumentReference<Bid>;
  const user = (await doc.get()).data();
  const newBalance = context.text.amount + player.balance
  const amount = context.text.amount
  
  if (!user) {
    throw logAndCreateError('not-found', `No user exists for uid: ${player.uid} `);
  }

  validateBid(bid);
  validateBalance(player);

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
