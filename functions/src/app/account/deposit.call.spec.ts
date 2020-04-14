import * as admin from 'firebase-admin';
import { test } from '../../test-utils/firebase-initialize';
import { failedPrecondition, permissionDenied, notFound } from '../../test-utils/firestore-test-utils';
import { players } from '../../test-utils/players.collection';
import { playersURL } from './../../lib/collection-names';
import { deposit } from './deposit.call';

describe('Deposit unittest', () => {

  // const deposit: any


  let depositFn: any;


  beforeAll(async () => {
    depositFn = test.wrap(deposit);
    await admin.firestore().doc(`${playersURL}/${players.player.uid}`).set({...players.player});
    await admin.firestore().doc(`${playersURL}/${players.admin.uid}`).set({...players.admin});
  });

  afterAll(async () => {
    await test.cleanup();
    await admin.firestore().doc(`${playersURL}/${players.player.uid}`).delete();
    await admin.firestore().doc(`${playersURL}/${players.admin.uid}`).delete();
  })

  it('should deny a deposit, when user not logged in', async () => {

    await depositFn({
      amount: 100,
      message: 'Hello'
    }).then(() => fail('Should have resulted in an error, when the user is not logged in'))
      .catch((_: any) => {
        expect(_.code).toEqual('unauthenticated')
      });
  });

  it('should deny a deposit, when user but not know', async () => {
    await depositFn({
      amount: 100,
      message: 'Hello'
    }, {
      auth: {
        uid: 'jckS2Q0'
      }
    }).then(() => fail('Should have resulted in an error, when user it not known'))
      .catch(notFound);
  });


  it('should deny a deposit, when the amount is not specified or zero', async () => {
    await depositFn({
      amount: 0,
      message: 'Hello',
      uid: players.player.uid
    }, {
      auth: {
        uid: players.admin.uid
      }
    }).then(() => fail('Should have resulted in an error, when amount is not specified or zero'))
      .catch(failedPrecondition);
  });

  it('should deny a deposit, when the amount is negative', async () => {
    await depositFn({
      amount: -100,
      message: 'Hello',
      uid: players.player.uid
    }, {
      auth: {
        uid: players.admin.uid
      }
    }).then(() => fail('Should have resulted in an error, when amount is negative'))
      .catch(failedPrecondition);
  });
  
  it('should deny a deposit, when the user does not have the role of bank-admin', async () => {
    await depositFn({
      amount: 100,
      message: 'Hello',
      uid: players.player.uid
    }, {
      auth: {
        uid: players.player.uid
      }
    }).then(() => fail('Should have resulted in an error, when the user does not have the role of bank-admin'))
      .catch(permissionDenied);
  });

  it('should accept a deposit', async () => {
    await depositFn({
      amount: 100,
      message: 'Hello',
      uid: players.player.uid
    }, {
      auth: {
        uid: players.admin.uid
      }
    }).catch((_: any) => fail('Deposit should have been allowed'));
  });
});

