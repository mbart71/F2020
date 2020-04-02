import * as functions from 'firebase-functions';
import { validateAccess } from '../user.service';
import { logAndCreateError } from './../../lib/firestore-utils';
import * as service from './bid.service';

export const submitBid = functions.region('europe-west1').https.onCall(async(data, context) => {
  return validateAccess(context.auth?.uid, 'player')
    .then(() => service.submitBid(context.auth!.uid))
    .then(() => true)
    .catch(errorMessage => {
      logAndCreateError('internal', errorMessage);
    })
});
