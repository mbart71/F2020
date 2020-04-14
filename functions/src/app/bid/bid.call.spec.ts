import { collections } from './../../test-utils/index';
import { test, cleanUp } from '../../test-utils/firebase-initialize';
import { shouldaFailed, notFound, failedPrecondition } from '../../test-utils/firestore-test-utils';
import { submitBid } from './bid.call';
import { playersURL, seasonsURL } from './../../lib/collection-names';
import * as admin from 'firebase-admin';
const clone = require('clone');

const context = {
  auth: {
    uid: collections.players.player.uid
  }
}

const writeBid = async (bid: any) => admin.firestore().doc(`${seasonsURL}/9999/races/${collections.races[1].location.country}/bids/${collections.players.player.uid}`).set(bid);

describe('Submit bid unittest', () => {

  let submitBidFn: any;
  let currentSeasonId: string;

  beforeAll(async () => {
    submitBidFn = test.wrap(submitBid);
    await admin.firestore().doc(`${playersURL}/${collections.players.player.uid}`).set({...collections.players.player});
    currentSeasonId = await admin.firestore().collection(`${seasonsURL}`).where('current', '==', true).get()
      .then(snapshot => snapshot.docs[0]?.data().id);
    await admin.firestore().doc(`${seasonsURL}/${currentSeasonId}`).update({current: false});
    await admin.firestore().doc(`${seasonsURL}/9999`).set(collections.seasons[0]);
    await admin.firestore().doc(`${seasonsURL}/9999/races/${collections.races[1].location.country}`).set(collections.races[1]);
  });

  afterAll(async () => {
    try {
      await admin.firestore().doc(`${seasonsURL}/${currentSeasonId}`).update({current: true});
      await test.cleanup();
      await admin.firestore().doc(`${playersURL}/${collections.players.player.uid}`).delete();
      await cleanUp();
    } catch (error) {
      console.log('afterAll failed', error);
      
    }
    // await admin.firestore().doc(`${seasonsURL}/9999/races/Azerbaijan/bids`).delete();
    // await admin.firestore().doc(`${seasonsURL}/9999/races`).delete();
    // await admin.firestore().doc(`${seasonsURL}/9999`).delete();
  })

  it('should deny a submit bid, when user not logged in', async () => {

    await submitBidFn().then(() => fail('Should have resulted in an error, when the user is not logged in'))
      .catch((_: any) => {
        expect(_.code).toEqual('unauthenticated')
      });
  });

  it('should deny a submit bid, when user but not know', async () => {
    await submitBidFn(null, {
      auth: {
        uid: 'jckS2Q0'
      }
    }).then(() => fail('Should have resulted in an error, when user it not known'))
      .catch(notFound);
  });


  it('should deny a submit bid, when the user has no bid', async () => {
    await submitBidFn(null, context).then(() => fail('Should have resulted in an error, when the player does not have a bid'))
      .catch(notFound);
  });

  it('should deny a submit bid, when bid is invalid', async () => {
    let bid = clone(collections.bids[0]);
    bid.qualify[1] = bid.qualify[0];
    await writeBid(bid);
    await submitBidFn(null, context).then(shouldaFailed).catch(failedPrecondition);
    bid = clone(collections.bids[0]);
    bid.qualify.push('hamilton');
    await writeBid(bid);
    await submitBidFn(null, context).then(shouldaFailed).catch(failedPrecondition);
    bid = clone(collections.bids[0]);
    bid.qualify.length = 5;
    await writeBid(bid);
    await submitBidFn(null, context).then(shouldaFailed).catch(failedPrecondition);

    bid = clone(collections.bids[0]);
    bid.podium[1] = bid.podium[0];
    await writeBid(bid);
    await submitBidFn(null, context).then(shouldaFailed).catch(failedPrecondition);
    bid = clone(collections.bids[0]);
    bid.podium.push('hamilton');
    await writeBid(bid);
    await submitBidFn(null, context).then(shouldaFailed).catch(failedPrecondition);
    bid = clone(collections.bids[0]);
    bid.podium.length = 2;
    await writeBid(bid);
    await submitBidFn(null, context).then(shouldaFailed).catch(failedPrecondition);

    bid = clone(collections.bids[0]);
    bid.fastestDriver.push('hamilton');
    await writeBid(bid);
    await submitBidFn(null, context).then(shouldaFailed).catch(failedPrecondition);
    bid = clone(collections.bids[0]);
    bid.fastestDriver.length = 0;
    await writeBid(bid);
    await submitBidFn(null, context).then(shouldaFailed).catch(failedPrecondition);

    bid = clone(collections.bids[0]);
    bid.firstCrash.push('hamilton');
    await writeBid(bid);
    await submitBidFn(null, context).then(shouldaFailed).catch(failedPrecondition);
    bid = clone(collections.bids[0]);
    bid.firstCrash.length = 0;
    await writeBid(bid);
    await submitBidFn(null, context).then(shouldaFailed).catch(failedPrecondition);

    bid = clone(collections.bids[0]);
    bid.selectedDriver.grid = 0;
    await writeBid(bid);
    await submitBidFn(null, context).then(shouldaFailed).catch(failedPrecondition);
    bid = clone(collections.bids[0]);
    bid.selectedDriver.grid = collections.races[1].drivers.length + 1;
    await writeBid(bid);
    await submitBidFn(null, context).then(shouldaFailed).catch(failedPrecondition);
    bid = clone(collections.bids[0]);
    bid.selectedDriver.finish = 0;
    await writeBid(bid);
    await submitBidFn(null, context).then(shouldaFailed).catch(failedPrecondition);
    bid = clone(collections.bids[0]);
    bid.selectedDriver.finish = collections.races[1].drivers.length + 1;
    await writeBid(bid);
    await submitBidFn(null, context).then(shouldaFailed).catch(failedPrecondition);
    bid = clone(collections.bids[0]);
    bid.selectedDriver.finish = -1;
    await writeBid(bid);
    await submitBidFn(null, context).then(shouldaFailed).catch(failedPrecondition);

    bid = clone(collections.bids[0]);
    bid.PolePositionTime = -1;
    await writeBid(bid);
    await submitBidFn(null, context).then(shouldaFailed).catch(failedPrecondition);

    bid = clone(collections.bids[0]);
    bid.PolePositionTime = 1000 * 60 * 2;
    await writeBid(bid);
    await submitBidFn(null, context).then(shouldaFailed).catch(failedPrecondition);

    bid = clone(collections.bids[0]);
    bid.PolePositionTime = 1000 * 60;
    await writeBid(bid);
    await submitBidFn(null, context).then(shouldaFailed).catch(failedPrecondition);


  });
  
  // it('should deny a deposit, when the user does not have the role of bank-admin', async () => {
  //   await submitBidFn({
  //     amount: 100,
  //     message: 'Hello',
  //     uid: collections.players.player.uid
  //   }, {
  //     auth: {
  //       uid: collections.players.player.uid
  //     }
  //   }).then(() => fail('Should have resulted in an error, when the user does not have the role of bank-admin'))
  //     .catch((_: any) => {
  //       expect(_.code).toEqual('permission-denied')
  //     });
  // });

  // it('should accept a deposit', async () => {
  //   await submitBidFn({
  //     amount: 100,
  //     message: 'Hello',
  //     uid: collections.players.player.uid
  //   }, {
  //     auth: {
  //       uid: collections.players.player.uid
  //     }
  //   }).catch((_: any) => fail('Deposit should have been allowed'));
  // });
});

