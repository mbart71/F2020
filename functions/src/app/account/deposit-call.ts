import { transferInTransaction } from './../../lib/transactions.service';
import { logAndCreateError, PlayerImpl, validateAccess } from "../../lib";
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';


export const deposit = functions.region('europe-west1').https.onCall(async(data, context) => {
  return validateAccess(context.auth?.uid, 'bankadmin')
    .then(player => buildDeposit(player))
    .then(() => true)
    .catch(errorMessage => {
      throw logAndCreateError('internal', errorMessage)
    });
});

const buildDeposit = async (player: PlayerImpl) => {
  const amount = data.match(/\d/g);
  const message = data.replace(/[0-9]/g, '');
  ; 
  
  if (!amount) {
    throw logAndCreateError('not-found', `No amount specified for uid: ${player.uid} `);
  }

  const db = admin.firestore();

  return db.runTransaction(transaction => {
    transferInTransaction({
      date: new Date(),
      amount: amount,
      message: message,
      from: 'CIQTphNeEfMXGUftQfoKvQt3lp73',
      to: player.uid,
    }, transaction);
    return Promise.resolve('Deposit request submitted');
  })
}
