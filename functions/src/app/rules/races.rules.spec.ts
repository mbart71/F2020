import { permissionDenied } from '../../test-utils/firestore-test-utils';
import { assertSucceeds, assertFails } from '@firebase/testing';
import { adminApp, authedApp, clearFirestoreData } from '../../test-utils/firestore-test-utils';
import { collections } from '../../test-utils';
import { playersURL, seasonsURL } from '../../lib/collection-names';


describe('transactions rules', () => {

  let adminFirestore: firebase.firestore.Firestore;

  beforeEach(async () => {
    adminFirestore = adminApp();
    await adminFirestore.doc(`${playersURL}/${collections.players.player.uid}`).set({ ...collections.players.player });
    await adminFirestore.doc(`${playersURL}/${collections.players.admin.uid}`).set({ ...collections.players.admin });
    await adminFirestore.doc(`${playersURL}/${collections.players.bookie.uid}`).set({ ...collections.players.bookie });
    await adminFirestore.doc(`${playersURL}/${collections.players.bankadmin.uid}`).set({ ...collections.players.bankadmin });
    await adminFirestore.doc(`${seasonsURL}/9999/races/${collections.races[1].location.country}`).set(collections.races[1]);
  });

  afterEach(async () => {
    await clearFirestoreData();
  });

  it('admin access to races checks', async () => {
    const app = await authedApp({ uid: collections.players.admin.uid });
    await assertSucceeds(app.firestore.doc(`${seasonsURL}/9999/races/${collections.races[1].location.country}`).get());
    await assertSucceeds(app.firestore.doc(`${seasonsURL}/9999/races/${collections.races[1].location.country}`).update({ state: 'open' }));
  });

  it('player access to races checks', async () => {
    const app = await authedApp({ uid: collections.players.player.uid });
    await assertSucceeds(app.firestore.doc(`${seasonsURL}/9999/races/${collections.races[1].location.country}`).get());
    await assertFails(app.firestore.doc(`${seasonsURL}/9999/races/${collections.races[1].location.country}`).update({ state: 'open' }));
   });

  it('bookie access to races checks', async () => {
    const app = await authedApp({ uid: collections.players.bookie.uid });
    await assertFails(app.firestore.doc(`${seasonsURL}/9999/races/${collections.races[1].location.country}`).get());
    await assertFails(app.firestore.doc(`${seasonsURL}/9999/races/${collections.races[1].location.country}`).update({ state: 'open' }));
  });

  it('bank admin access to races checks', async () => {
    const app = await authedApp({ uid: collections.players.bankadmin.uid });
    await assertFails(app.firestore.doc(`${seasonsURL}/9999/races/${collections.races[1].location.country}`).get());
    await assertFails(app.firestore.doc(`${seasonsURL}/9999/races/${collections.races[1].location.country}`).update({ state: 'open' }));
  });

  it('non-player should not be allowed to read races', async () => {
    const app = await authedApp({ uid: 'non-player-id' });
    await assertFails(app.firestore.doc(`${seasonsURL}/9999/races/${collections.races[1].location.country}`).get()).then(permissionDenied)
  });
  
});
