import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp(functions.config().firebase)

export * from './app/bid/bid.call';
export * from './app/transaction/transaction.trigger';
