// const firebaseTest = require('firebase-functions-test')({
//   databaseURL: 'https://f1-serverless.firebaseio.com',
//   storageBucket: 'f1-serverless.appspot.com',
//   projectId: 'f1-serverless',
// }, '~/projects/f2007/f1-serverless-7b6d99907667.json');

import * as firebaseTest from 'firebase-functions-test';
const test = firebaseTest({
  databaseURL: 'https://f1-serverless.firebaseio.com',
  storageBucket: 'f1-serverless.appspot.com',
  projectId: 'f1-serverless',
}, process.env.GOOGLE_APPLICATION_CREDENTIALS);

import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
admin.initializeApp(functions.config().firebase)

import { deposit } from './deposit.call';

describe('Testing framework configured', () => {
  
  // const deposit: any
  
  
  let depositFn: any;


  beforeEach(async () => {
    depositFn = test.wrap(deposit);
  });

  it('is should run?', async () => {

    await depositFn({
      amount: 100,
      message: 'Hello'
    })
    .catch((_: any) => {
      expect(_.code).toEqual('permission-denied')
    });
  });

});
