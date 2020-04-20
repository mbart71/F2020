import { permissionDenied } from './../../test-utils/firestore-test-utils';
import { assertSucceeds, assertFails } from '@firebase/testing';
import { adminApp, authedApp, clearFirestoreData } from '../../test-utils/firestore-test-utils';
import { collections } from '../../test-utils';
import { playersURL } from './../../lib/collection-names';
//import admin = require('firebase-admin');

describe('Player rules', () => {

  let adminFirestore: firebase.firestore.Firestore;

  beforeEach(async () => {
    adminFirestore = adminApp();
    await adminFirestore.doc(`${playersURL}/${collections.players.player.uid}`).set({ ...collections.players.player });
    await adminFirestore.doc(`${playersURL}/${collections.players.admin.uid}`).set({ ...collections.players.admin });
    await adminFirestore.doc(`${playersURL}/${collections.players.bookie.uid}`).set({ ...collections.players.bookie });
    await adminFirestore.doc(`${playersURL}/${collections.players.bankadmin.uid}`).set({ ...collections.players.bankadmin });
  });

  afterEach(async () => {
    await clearFirestoreData();
  });

  it('admin checks', async () => {
    const app = await authedApp({ uid: collections.players.admin.uid });
    await assertSucceeds(app.firestore.doc(`${playersURL}/${collections.players.player.uid}`).update({ displayName: 'Mickey Mouse' }))
    await assertFails(app.firestore.doc(`${playersURL}/${collections.players.player.uid}`).update({ balance: 9999 }))
    await assertFails(app.firestore.doc(`${playersURL}/${collections.players.player.uid}`).update({ uid: 'XXXX' }))
    await assertSucceeds(app.firestore.doc(`${playersURL}/${collections.players.player.uid}`).update({ roles: ['NO!'] }))
    await assertSucceeds(app.firestore.doc(`${playersURL}/${collections.players.player.uid}`).update({ NickName: 'Mike' }))
  });

  it('player checks', async () => {
    const app = await authedApp({ uid: collections.players.player.uid });
    await assertSucceeds(app.firestore.doc(`${playersURL}/${collections.players.player.uid}`).update({ displayName: 'Mickey Mouse' }))
    await assertSucceeds(app.firestore.doc(`${playersURL}/${collections.players.player.uid}`).update({ email: 'Flemming@bregnvig.dk' }))
    await assertFails(app.firestore.doc(`${playersURL}/${collections.players.player.uid}`).update({ balance: 9999 }))
    await assertFails(app.firestore.doc(`${playersURL}/${collections.players.player.uid}`).update({ uid: 'XXXXX' }))
    await assertFails(app.firestore.doc(`${playersURL}/${collections.players.player.uid}`).update({ roles: ['NO!']}))
    await assertSucceeds(app.firestore.doc(`${playersURL}/${collections.players.player.uid}`).update({ NickName: 'Mike'}))
  });

  it('bookie checks', async () => {
    const app = await authedApp({ uid: collections.players.bookie.uid });
    await assertFails(app.firestore.doc(`${playersURL}/${collections.players.player.uid}`).update({ displayName: 'Mickey Mouse' }))
    await assertFails(app.firestore.doc(`${playersURL}/${collections.players.player.uid}`).update({ balance: 9999 }))
    await assertFails(app.firestore.doc(`${playersURL}/${collections.players.player.uid}`).update({ uid: 'XXXXX' }))
    await assertFails(app.firestore.doc(`${playersURL}/${collections.players.player.uid}`).update({ roles: ['NO!']}))
    await assertFails(app.firestore.doc(`${playersURL}/${collections.players.player.uid}`).update({ NickName: 'Mike'}))
    await assertFails(app.firestore.doc(`${playersURL}/${collections.players.player.uid}`).update({ email: 'Flemming@bregnvig.dk'}))
  });

  it('bank admin checks', async () => {
    const app = await authedApp({ uid: collections.players.bankadmin.uid });
    await assertFails(app.firestore.doc(`${playersURL}/${collections.players.player.uid}`).update({ displayName: 'Mickey Mouse' }))
    await assertFails(app.firestore.doc(`${playersURL}/${collections.players.player.uid}`).update({ balance: 9999 }))
    await assertFails(app.firestore.doc(`${playersURL}/${collections.players.player.uid}`).update({ uid: 'XXXXX' }))
    await assertFails(app.firestore.doc(`${playersURL}/${collections.players.player.uid}`).update({ roles: ['NO!']}))
    await assertFails(app.firestore.doc(`${playersURL}/${collections.players.player.uid}`).update({ NickName: 'Mike'}))
    await assertFails(app.firestore.doc(`${playersURL}/${collections.players.player.uid}`).update({ email: 'Flemming@bregnvig.dk'}))
  });

  it('non-player should not be allowed to read players', async () => {
    const app = await authedApp({ uid: 'non-player-id' });
    await assertFails(app.firestore.collection(`${playersURL}`).get()).then(permissionDenied)
  });
  
});
