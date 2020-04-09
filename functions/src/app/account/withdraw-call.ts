import { transferInTransaction } from './../../lib/transactions.service';
import { logAndCreateError, PlayerImpl, validateAccess } from "../../lib";
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

const validateBalance = (player: PlayerImpl): void => {

  if ((player.balance || 0) - amount < 0) {
    throw logAndCreateError('failed-precondition', `${player.displayName} has insufficient funds. Balance: ${(player.balance || 0).toFixed(2)}`)
  }

}

export const withdraw = functions.region('europe-west1').https.onCall(async(data, context) => {
  return validateAccess(context.auth?.uid, 'bankadmin')
    .then(player => buildWithdraw(player))
    .then(() => true)
    .catch(errorMessage => {
      throw logAndCreateError('internal', errorMessage)
    });
});

  const buildWithdraw = async (player: PlayerImpl) => {
    const amount = data;
    const message = context;
    
    if (!amount) {
      throw logAndCreateError('not-found', `No amount specified for uid: ${player.uid} `);
    }

    const db = admin.firestore();

    
    validateBalance(player);

    return db.runTransaction(transaction => {
      transferInTransaction({
        date: new Date(),
        amount: amount,
        message: message,
        from: player.uid,
        to: 'Sent OutSide',
      }, transaction);
      return Promise.resolve('Withddraw request submitted');
    })
  }
