// const firebaseTest = require('firebase-functions-test')({
//   databaseURL: 'https://f1-serverless.firebaseio.com',
//   storageBucket: 'f1-serverless.appspot.com',
//   projectId: 'f1-serverless',
// }, '~/projects/f2007/f1-serverless-7b6d99907667.json');

// const test = require('../../test-utils/firebase-initialize').test;
// import * as admin from 'firebase-admin';

import { test}  from '../../test-utils/firebase-initialize';
import { deposit } from './deposit.call';

describe('Deposit unittest', () => {
  
  // const deposit: any
  
  
  let depositFn: any;


  beforeEach(async () => {
    depositFn = test.wrap(deposit);
    // const ref = await admin.database().ref('players');
    // console.log(ref);
    
  });

  it('should deny a deposit, when user not logged in', async () => {

    await depositFn({
      amount: 100,
      message: 'Hello'
    })
    .catch((_: any) => {
      expect(_.code).toEqual('permission-denied')
    });
  });

  it('should deny a deposit, when user but not know', async () => {
    // const snap= test.database.makeDataSnapshot({}, '/players/jckS2Q0')
    await depositFn({
      amount: 100,
      message: 'Hello'
    }, {
      auth: {
        uid: 'jckS2Q0'
      }
    })
    .catch((_: any) => {
      expect(_.code).toEqual('permission-denied')
    });
  });

});
