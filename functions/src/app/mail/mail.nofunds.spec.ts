// import { assertFails, assertSucceeds } from '@firebase/testing';
import { playersURL } from '../../lib/collection-names';
// import { Player } from '../../lib/model/player.model';
import { collections } from '../../test-utils';
import { adminApp, clearFirestoreData } from '../../test-utils/firestore-test-utils';

describe('Send Mail unittest', () => {

  let adminFirestore: firebase.firestore.Firestore;

  beforeEach(async () => {
    adminFirestore = adminApp();
    await adminFirestore.doc(`${playersURL}/${collections.players.player.uid}`).set({ ...collections.players.player });
  });

  afterEach(async () => {
    await clearFirestoreData();

  })

  it('Update should trigger email to be send', async () => {
    // const app = await authedApp({ uid: collections.players.player.uid });
    await adminFirestore.doc(`${playersURL}/${collections.players.player.uid}`).update({ balance: -100 });
    
  });
});

