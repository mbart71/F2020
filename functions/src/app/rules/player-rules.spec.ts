import { permissionDenied } from './../../test-utils/firestore-test-utils';
import { assertSucceeds, assertFails } from '@firebase/testing';
import { adminApp, authedApp, clearFirestoreData } from '../../test-utils/firestore-test-utils';
import { collections } from '../../test-utils';
import { playersURL } from './../../lib/collection-names';

describe('Player rules', () => {

  let adminFirestore: firebase.firestore.Firestore;

  beforeEach(async () => {
    adminFirestore = adminApp();
    await adminFirestore.doc(`${playersURL}/${collections.players.player.uid}`).set({ ...collections.players.player });
    await adminFirestore.doc(`${playersURL}/${collections.players.admin.uid}`).set({ ...collections.players.admin });
  });

  afterEach(async () => {
    await clearFirestoreData();
  });

  it('admin should be allowed to update display name', async () => {
    const app = await authedApp({ uid: collections.players.admin.uid });
    await assertSucceeds(app.firestore.doc(`${playersURL}/${collections.players.player.uid}`).update({ displayName: 'Mickey Mouse' }))
  });

  it('player should be allowed to update display name', async () => {
    const app = await authedApp({ uid: collections.players.player.uid });
    await assertSucceeds(app.firestore.doc(`${playersURL}/${collections.players.player.uid}`).update({ displayName: 'Mickey Mouse' }))
  });

  it('non-player should not be allowed to read players', async () => {
    const app = await authedApp({ uid: 'non-player-id' });
    await assertFails(app.firestore.collection(`${playersURL}`).get()).then(permissionDenied)
  });
  
  it('player should not be allowed to update uid', async () => {
    const app = await authedApp({ uid: collections.players.player.uid });
    await assertFails(app.firestore.doc(`${playersURL}/${collections.players.player.uid}`).update({ roles: ['NO!'] }))
  });
});
