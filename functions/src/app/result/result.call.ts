import * as functions from 'firebase-functions';
import { validateAccess, logAndCreateError } from '../../lib';

export const submitResult = functions.region('europe-west1').https.onCall(async(data, context) => {
  return validateAccess(context.auth?.uid, 'admin')
  .catch(errorMessage => {
    throw logAndCreateError('internal', errorMessage)
  });
});
