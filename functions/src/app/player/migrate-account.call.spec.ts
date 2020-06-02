import { assertFails, assertSucceeds } from '@firebase/testing';
import { collections } from '../../test-utils';
// import { test } from '../../test-utils/firebase-initialize';
import { adminApp, authedApp, clearFirestoreData, unauthenticated } from '../../test-utils/firestore-test-utils';
import { players } from '../../test-utils/players.collection';
import { playersURL, transactionsURL } from './../../lib/collection-names';
import { permissionDenied } from './../../test-utils/firestore-test-utils';
import { Transaction } from '../../lib/model';

describe('Migrate unittest', () => {

  let adminFirestore: firebase.firestore.Firestore;

  const readTransaction = async (id: string): Promise<Transaction> => adminFirestore.doc(`${transactionsURL}/${id}`).get().then(snapshot => snapshot.data() as Transaction);

  beforeEach(async () => {
    // depositFn = test.wrap(deposit);
    adminFirestore = adminApp();
    await adminFirestore.doc(`${playersURL}/${collections.players.player.uid}`).set({ ...collections.players.player });
    await adminFirestore.doc(`${playersURL}/${collections.players.admin.uid}`).set({ ...collections.players.admin });
    await adminFirestore.doc(`${playersURL}/${collections.players.bookie.uid}`).set({ ...collections.players.bookie });
    await adminFirestore.doc(`${playersURL}/${collections.players.bankadmin.uid}`).set({ ...collections.players.bankadmin });

    await adminFirestore.doc(`${transactionsURL}/1`).set({ from: '1', to: null, involved: ['1'], amount: 100, date: new Date() });
    await adminFirestore.doc(`${transactionsURL}/2`).set({ from: '1', to: '2', involved: ['1', '2'], amount: 100, date: new Date() });
    await adminFirestore.doc(`${transactionsURL}/3`).set({ from: null, to: '1', involved: ['1'], amount: 100, date: new Date() });
    await adminFirestore.doc(`${transactionsURL}/4`).set({ from: '2', to: '1', involved: ['1', '2'], amount: 100, date: new Date() });

  });

  afterEach(async () => {
    await clearFirestoreData();
  })

  it('should deny a migration, when user not logged in', async () => {
    const app = await authedApp();
    await assertFails(app.functions.httpsCallable('migrateAccount')({ uid: players.player.uid, accountId: 1 }))
      .then(unauthenticated);
  });
  it('should deny a migration, when user is not bank-admin', async () => {
    const app = await authedApp({ uid: collections.players.player.uid });
    await assertFails(app.functions.httpsCallable('migrateAccount')({ uid: players.player.uid, accountId: 1 }))
      .then(permissionDenied);
  });
  it('should deny a migration, when user is not bank-admin', async () => {
    const app = await authedApp({ uid: collections.players.player.uid });
    await assertFails(app.functions.httpsCallable('migrateAccount')({ uid: players.player.uid, accountId: 1 }))
      .then(permissionDenied);
  });

  it('should migration the tranaction, when user is bank-admin', async () => {
    const app = await authedApp({ uid: collections.players.bankadmin.uid });
    const transaction = await readTransaction('1');
    expect(transaction.involved.includes(collections.players.bankadmin.uid)).toBeFalsy();
    expect(transaction.involved.includes('1')).toBeTruthy();
    await assertSucceeds(app.functions.httpsCallable('migrateAccount')({ uid: players.player.uid, accountId: 1 }))
      .then(async () => {
        const t = await readTransaction('1');
        expect(t!.from).toBe(players.player.uid);
        expect(t!.to).toBeNull();
        expect(t.involved.includes(collections.players.player.uid)).toBeTruthy();
        expect(t.involved.includes('1')).toBeFalsy();
      })
      .then(async () => {
        const t = await readTransaction('2');
        expect(t!.from).toBe(players.player.uid);
        expect(t!.to).toBe('2');
        expect(t.involved.includes(collections.players.player.uid)).toBeTruthy();
        expect(t.involved.includes('1')).toBeFalsy();
      })
      .then(async () => {
        const t = await readTransaction('3');
        expect(t!.to).toBe(players.player.uid);
        expect(t!.from).toBeNull();
        expect(t.involved.includes(collections.players.player.uid)).toBeTruthy();
        expect(t.involved.includes('1')).toBeFalsy();
      })
      .then(async () => {
        const t = await readTransaction('4');
        expect(t!.to).toBe(players.player.uid);
        expect(t!.from).toBe('2');
        expect(t.involved.includes(collections.players.player.uid)).toBeTruthy();
        expect(t.involved.includes('1')).toBeFalsy();
      })
    });
});