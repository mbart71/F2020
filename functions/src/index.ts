import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp(functions.config().firebase)

export * from './app/bid/bid.call';
export * from './app/result/result.call';
export * from './app/account/deposit.call';
export * from './app/account/withdraw.call';
export * from './app/account/transfer.call';

export * from './app/transaction/transaction.trigger';
<<<<<<< HEAD
export * from './app/mail/mail.nofunds';
=======
export * from './app/wbc/wbc-points.trigger';
>>>>>>> 6832b4ab916bdc4875db9efa90ccaab22159b719

