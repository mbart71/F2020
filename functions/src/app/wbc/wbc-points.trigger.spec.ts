import { assertSucceeds } from '@firebase/testing';
import { playersURL, seasonsURL } from '../../lib/collection-names';
import { WBCRace } from '../../lib/model';
import { collections } from '../../test-utils';
import { adminApp, authedApp, clearFirestoreData } from '../../test-utils/firestore-test-utils';

const clone = require('clone');

describe('WBC points', () => {

  let adminFirestore: firebase.firestore.Firestore;

  const writeBid = async (bid: any, uid: string, raceId: string) => adminFirestore.doc(`${seasonsURL}/9999/races/${raceId}/bids/${uid}`).set(bid);
  const readWBCPlayer = async (uid: string): Promise<WBCRace> => adminFirestore.doc(`${seasonsURL}/9999/wbc-${playersURL}/${uid}`).get().then(ref => ref.data() as WBCRace);
  // const readWBCRace = async (raceId: string): Promise<WBCPlayers> => adminFirestore.doc(`${seasonsURL}/9999/wbc-${racesURL}/${raceId}`).get().then(ref => ref.data() as WBCPlayers);

  beforeEach(async () => {
    adminFirestore = adminApp();
    await adminFirestore.doc(`${playersURL}/${collections.players.admin.uid}`).set({ ...collections.players.admin });
    await adminFirestore.doc(`${playersURL}/${collections.players.player.uid}`).set({ ...collections.players.player });
    await adminFirestore.doc(`${playersURL}/${collections.players.bookie.uid}`).set({ ...collections.players.bookie });

    await adminFirestore.doc(`${seasonsURL}/9999`).set(collections.seasons[0]);
    await adminFirestore.doc(`${seasonsURL}/9999/races/${collections.races[1].location.country}`).set({ ...collections.races[1], state: 'closed' });
  });

  afterEach(async () => {
    await clearFirestoreData();
  })

  it('should add player entry to the wbc of the season', async () => {
    await writeBid({ ...clone(collections.bids[0]), submitted: true }, collections.players.admin.uid, collections.races[1].location.country);
    await writeBid({ ...clone(collections.bids[1]), submitted: true }, collections.players.player.uid, collections.races[1].location.country);

    const app = await authedApp({ uid: collections.players.admin.uid });
    await assertSucceeds(app.functions.httpsCallable('submitResult')(collections.results[1]))
      .then(() => new Promise(resolve => setTimeout(() => resolve(), 2000)))
      .then(() => readWBCPlayer(collections.players.admin.uid))
      .then(({races}: {races: WBCRace[]}) => {
        expect(races.length).toEqual(1);
        const [race] = races;
        expect(race.points).toBeTruthy();
        expect(race.points).toEqual(18);
        expect(race.race).toBeTruthy();
        expect(race.race.name).toEqual('Azerbaijan Grand Prix');
      })
      .then(() => readWBCPlayer(collections.players.player.uid))
      .then(({races}: {races: WBCRace[]}) => {
        expect(races.length).toEqual(1);
        const [race] = races;
        expect(race.points).toBeTruthy();
        expect(race.points).toEqual(25);
        expect(race.race).toBeTruthy();
        expect(race.race.name).toEqual('Azerbaijan Grand Prix');
      })

    await adminFirestore.doc(`${seasonsURL}/9999/races/${collections.races[0].location.country}`).set({ ...collections.races[0], state: 'closed' });
    await writeBid({ ...clone(collections.bids[0]), submitted: true }, collections.players.admin.uid, collections.races[0].location.country);
    await writeBid({ ...clone(collections.bids[1]), submitted: true }, collections.players.player.uid, collections.races[0].location.country);

    await assertSucceeds(app.functions.httpsCallable('submitResult')(collections.results[0]))
      .then(() => new Promise(resolve => setTimeout(() => resolve(), 2000)))
      .then(() => readWBCPlayer(collections.players.admin.uid))
      .then(({ races }: { races: WBCRace[] }) => {
        expect(races.length).toEqual(2);
        const race = races[1];
        expect(race.points).toBeTruthy();
        expect(race.points).toEqual(25);
        expect(race.race).toBeTruthy();
        expect(race.race.name).toEqual('Austrian Grand Prix');
      })
      .then(() => readWBCPlayer(collections.players.player.uid))
      .then(({ races }: { races: WBCRace[] }) => {
        expect(races.length).toEqual(2);
        const race = races[1];
        expect(race.points).toBeTruthy();
        expect(race.points).toEqual(18);
        expect(race.race).toBeTruthy();
        expect(race.race.name).toEqual('Austrian Grand Prix');
      })
    });

  it('should award WBC based on pole time, if points are equal', async () => {
    await writeBid({ ...clone(collections.bids[0]), submitted: true }, collections.players.admin.uid, collections.races[1].location.country);
    await writeBid({
      ...clone(collections.bids[0]),
      player: collections.players.player,
      polePositionTime: collections.results[0].polePositionTime,
      submitted: true
    },
      collections.players.player.uid,
      collections.races[1].location.country);

    const app = await authedApp({ uid: collections.players.admin.uid });
    await assertSucceeds(app.functions.httpsCallable('submitResult')(collections.results[0]))
      .then(() => new Promise(resolve => setTimeout(() => resolve(), 2000)))
      .then(() => readWBCPlayer(collections.players.admin.uid))
      .then(({ races }: { races: WBCRace[] }) => {
        expect(races.length).toEqual(1);
        const [race] = races;
        expect(race.points).toBeTruthy();
        expect(race.points).toEqual(18);
        expect(race.race).toBeTruthy();
        expect(race.race.name).toEqual('Azerbaijan Grand Prix');
      })
      .then(() => readWBCPlayer(collections.players.player.uid))
      .then(({ races }: { races: WBCRace[] }) => {
        expect(races.length).toEqual(1);
        const [race] = races;
        expect(race.points).toBeTruthy();
        expect(race.points).toEqual(25);
        expect(race.race).toBeTruthy();
        expect(race.race.name).toEqual('Azerbaijan Grand Prix');
      })
    })
});
