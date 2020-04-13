import { seasonsURL } from './../lib/collection-names';
import * as firebaseTest from 'firebase-functions-test';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
admin.initializeApp(functions.config().firebase)

export const test = firebaseTest({
  databaseURL: 'https://f1-serverless.firebaseio.com',
  projectId: 'f1-serverless',
}, '/home/flemming/projects/f2007/f1-serverless-7b6d99907667.json'); // );process.env.GOOGLE_APPLICATION_CREDENTIALS);


const tools = require('firebase-tools');
export const cleanUp = async () => await tools.firestore
  .delete(`${seasonsURL}/9999`, {
    project: 'f1-serverless',
    recursive: true,
    yes: true,
    token: process.env.F1_SERVERLESS_TOKEN
  }).catch(console.error);


