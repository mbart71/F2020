import * as functions from 'firebase-functions';
import { validateAccess } from '../user.service';
import * as service from './bid.service';

export const submitBid = functions.region('europe-west1').https.onCall(async(data, context) => {
  return validateAccess(context.auth?.uid, 'player')
    .then(() => service.submitBid(context.auth!.uid))
    .then(() => true)
    .catch(error => console.error(error))
});
