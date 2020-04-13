import { test } from '../../test-utils/firebase-initialize';
import { withdraw } from './withdraw.call';
import { players } from '../../test-utils/players.collection';
import { playersURL } from './../../lib/collection-names';
import * as admin from 'firebase-admin';

describe('Withdraw unittest', () => {

  let withdrawFn: any;


  beforeAll(async () => {
    withdrawFn = test.wrap(withdraw);
    await admin.firestore().doc(`${playersURL}/${players.admin.uid}`).set({...players.admin});
    await admin.firestore().doc(`${playersURL}/${players.player.uid}`).set({...players.player});
  });
  
  afterAll(async () => {
    await test.cleanup();
    await admin.firestore().doc(`${playersURL}/${players.player.uid}`).delete();
    await admin.firestore().doc(`${playersURL}/${players.admin.uid}`).delete();
  })

  it('should deny a with, when user not logged in', async () => {

    await withdrawFn({
      amount: 100,
      message: 'Hello'
    }).then(() => fail('Should have resulted in an error, when the user is not logged in'))
      .catch((_: any) => {
        expect(_.code).toEqual('unauthenticated')
      });
  });

  it('should deny a withdraw, when user but not know', async () => {
    await withdrawFn({
      amount: 100,
      message: 'Hello'
    }, {
      auth: {
        uid: 'jckS2Q0'
      }
    }).then(() => fail('Should have resulted in an error, when user it not known'))
      .catch((_: any) => {
        expect(_.code).toEqual('not-found')
      });
  });


  it('should deny a withdraw, when the amount is not specified or zero', async () => {
    await withdrawFn({
      amount: 0,
      message: 'Hello',
      uid: players.player.uid
    }, {
      auth: {
        uid: players.admin.uid
      }
    }).then(() => fail('Should have resulted in an error, when amount is not specified or zero'))
      .catch((_: any) => {
        expect(_.code).toEqual('failed-precondition')
      });
  });

  it('should deny a withdraw, when the amount is negative', async () => {
    await withdrawFn({
      amount: -100,
      message: 'Hello',
      uid: players.player.uid
    }, {
      auth: {
        uid: players.admin.uid
      }
    }).then(() => fail('Should have resulted in an error, when amount is negative'))
      .catch((_: any) => {
        expect(_.code).toEqual('failed-precondition')
      });
  });
  
  it('should deny a withdraw, when the user does not have the role of bank-admin', async () => {
    await withdrawFn({
      amount: 100,
      message: 'Hello',
      uid: players.player.uid
    }, {
      auth: {
        uid: players.player.uid
      }
    }).then(() => fail('Should have resulted in an error, when the user does not have the role of bank-admin'))
      .catch((_: any) => {
        expect(_.code).toEqual('permission-denied')
      });
  });

  it('should deny a withdraw, when the account does not have enough money', async () => {
    await withdrawFn({
      amount: 201,
      message: 'Hello',
      uid: players.player.uid
    }, {
      auth: {
        uid: players.admin.uid
      }
    }).then(() => fail('Should have resulted in an error, when the account does not have enough money'))
      .catch((_: any) => {
        expect(_.code).toEqual('failed-precondition')
      });
  });

  it('should accept a withdraw', async () => {
    await withdrawFn({
      amount: 100,
      message: 'Hello',
      uid: players.player.uid
    }, {
      auth: {
        uid: players.admin.uid
      }
    }).catch((_: any) => fail('Withdraw should have been allowed' + _.toString()));
  });
});

