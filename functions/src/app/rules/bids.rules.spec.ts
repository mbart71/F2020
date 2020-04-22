import { permissionDenied } from '../../test-utils/firestore-test-utils';
import { assertSucceeds, assertFails } from '@firebase/testing';
import { adminApp, authedApp, clearFirestoreData } from '../../test-utils/firestore-test-utils';
import { collections } from '../../test-utils';
import { playersURL, seasonsURL } from '../../lib/collection-names';


describe('bids rules', () => {

  let adminFirestore: firebase.firestore.Firestore;

  beforeEach(async () => {
    adminFirestore = adminApp();
    await adminFirestore.doc(`${playersURL}/${collections.players.player1.uid}`).set({ ...collections.players.player1 });
    await adminFirestore.doc(`${playersURL}/${collections.players.player2.uid}`).set({ ...collections.players.player2 });
    await adminFirestore.doc(`${playersURL}/${collections.players.admin.uid}`).set({ ...collections.players.admin });
    await adminFirestore.doc(`${playersURL}/${collections.players.bookie.uid}`).set({ ...collections.players.bookie });
    await adminFirestore.doc(`${playersURL}/${collections.players.bankadmin.uid}`).set({ ...collections.players.bankadmin });
    await adminFirestore.doc(`${seasonsURL}/9999/races/${collections.races[1].location.country}`).set(collections.races[1]);
  });

  afterEach(async () => {
    await clearFirestoreData();
  });

  it('admin access to transactions checks', async () => {
    const app = await authedApp({ uid: collections.players.admin.uid });
    await assertSucceeds(app.firestore.doc(`${seasonsURL}/9999/races/${collections.races[1].location.country}/bids/${collections.players.player1.uid}`).get())
    await assertSucceeds(app.firestore.doc(`${seasonsURL}/9999/races/${collections.races[1].location.country}/bids/${collections.players.player2.uid}`).get())
    await assertFails(app.firestore.doc(`${seasonsURL}/9999/races/${collections.races[1].location.country}/bids/${collections.players.player1.uid}`).update({submitted: false}))
    await assertFails(app.firestore.doc(`${seasonsURL}/9999/races/${collections.races[1].location.country}/bids/${collections.players.player1.uid}`).update({firstCrash: [ 'hammilton' ]}))
     });

  it('player access to bids checks - user has submitted bid', async () => {
    const app = await authedApp({ uid: collections.players.player1.uid });
    await assertSucceeds(app.firestore.doc(`${seasonsURL}/9999/races/${collections.races[1].location.country}/bids/${collections.players.player1.uid}`).get())
    await assertSucceeds(app.firestore.doc(`${seasonsURL}/9999/races/${collections.races[1].location.country}/bids/${collections.players.player2.uid}`).get())
    await assertFails(app.firestore.doc(`${seasonsURL}/9999/races/${collections.races[1].location.country}/bids/${collections.players.player1.uid}`).update({submitted: false}))
    await assertFails(app.firestore.doc(`${seasonsURL}/9999/races/${collections.races[1].location.country}/bids/${collections.players.player2.uid}`).update({submitted: true}))
    await assertFails(app.firestore.doc(`${seasonsURL}/9999/races/${collections.races[1].location.country}/bids/${collections.players.player1.uid}`).update({firstCrash: [ 'hammilton' ]}))
   });

  it('player2 access to bids checks - user has not submitted his bid', async () => {
    const app = await authedApp({ uid: collections.players.player2.uid });
    await assertSucceeds(app.firestore.doc(`${seasonsURL}/9999/races/${collections.races[1].location.country}/bids/${collections.players.player2.uid}`).get())
    await assertFails(app.firestore.doc(`${seasonsURL}/9999/races/${collections.races[1].location.country}/bids/player-uid`).get())
    // await assertFails(app.firestore.doc(`${seasonsURL}/9999/races/${collections.races[1].location.country}/bids/${collections.players.player.uid}`).get())
    await assertFails(app.firestore.doc(`${seasonsURL}/9999/races/${collections.races[1].location.country}/bids/${collections.players.player1.uid}`).update({submitted: false}))
    await assertFails(app.firestore.doc(`${seasonsURL}/9999/races/${collections.races[1].location.country}/bids/${collections.players.player2.uid}`).update({submitted: true}))
    await assertSucceeds(app.firestore.doc(`${seasonsURL}/9999/races/${collections.races[1].location.country}/bids/${collections.players.player2.uid}`).update({firstCrash: [ 'hammilton' ]}))
  });

  it('non-player should not be allowed to read transaction', async () => {
    const app = await authedApp({ uid: 'non-player-id' });
    await assertFails(app.firestore.doc(`${seasonsURL}/9999/races/${collections.races[1].location.country}/bids/${collections.players.player1.uid}`).get()).then(permissionDenied)
  });
  
});
