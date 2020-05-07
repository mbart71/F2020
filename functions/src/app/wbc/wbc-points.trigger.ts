import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { Bid, IRace, racesURL, seasonsURL, playersURL } from '../../lib';

const db = admin.firestore();
const wbcPoints = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];
/**
 * The struture fo the WBC is:
 * seasons/{seasonId}/wbc-races/{raceId} - The document contains an array of { points: number, player: Player}
 * seasons/{seasonId}/wbc-players/{playerId} - The document contains an array of { points: number, race: RaceBasic }
 */
export const wbcPointsTrigger = functions.region('europe-west1').firestore.document('seasons/{seasonId}/races/{raceId}')
  .onUpdate(async (change: functions.Change<functions.firestore.DocumentSnapshot>, context: functions.EventContext) => {
    const before: IRace = change.before.data() as IRace;
    const after: IRace = change.after.data() as IRace;
    if (before.state === 'closed' && after.state === 'completed') {
      const bids: Bid[] = await db.collection(`${seasonsURL}/${context.params.seasonId}/${racesURL}/${context.params.raceId}/bids`)
        .orderBy('points', 'desc')
        .orderBy('polePositionTimeDiff', 'asc')
        .limit(10)
        .get()
        .then(snapshot => snapshot.docs.map(s => s.data() as Bid));
      await createWBCRace(after, bids, db.doc(`${seasonsURL}/${context.params.seasonId}/wbc-${racesURL}/${context.params.raceId}`));
      await Promise.all(bids.map((b, index) => createWBCPlayer(after, wbcPoints[index], db.doc(`${seasonsURL}/${context.params.seasonId}/wbc-${playersURL}/${b.player!.uid}`))))
    }
    return Promise.resolve(true)
  });

const createWBCRace = async (race: IRace, bids: Bid[], ref: admin.firestore.DocumentReference) => {
  return ref.set({
    race,
    players: bids.map((b, index) => ({
      player: b.player,
      points: wbcPoints[index] 
    }))
  })
}

const createWBCPlayer = async (race: IRace, points: number, ref: admin.firestore.DocumentReference) => {
  return ref.set({
    races: admin.firestore.FieldValue.arrayUnion({race, points})
  }, {merge: true});  
}
