import * as firebaseTest from 'firebase-functions-test';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
admin.initializeApp(functions.config().firebase)
export const test = firebaseTest({
  databaseURL: 'https://f1-serverless.firebaseio.com',
  projectId: 'f1-serverless',
}, '/home/flemming/projects/f2007/f1-serverless-7b6d99907667.json'); // );process.env.GOOGLE_APPLICATION_CREDENTIALS);

