import * as admin from 'firebase-admin';
import { Bid } from '../../lib';
import { logAndCreateError } from './../../lib/firestore-utils';
import { getCurrentRace } from './../../lib/race.service';
import { currentSeason } from './../../lib/season.service';

const noNullsInArray = (array: (string | null)[]): boolean => array.every(Boolean);

export const submitBid = async(uid: string): Promise<admin.firestore.WriteResult> => {
  const season = await currentSeason();
  const race = await getCurrentRace();
  if (!season || !race) {
    throw logAndCreateError('failed-precondition', 'Missing season or race', season, race);
  }
  const doc = admin.firestore().doc(`season/${season.id}/races/${race.location.country}/bids/${uid}`) as admin.firestore.DocumentReference<Bid>;
  const bid = (await doc.get()).data();
  if (!bid) {
    throw logAndCreateError('not-found', `No bid exists for uid: ${uid} for race ${race.location.country}`);
  }
  const validArrays: boolean = Object.values(bid).filter(v => Array.isArray(v)).map(noNullsInArray).every(Boolean);
  const validPole: boolean = !!(bid.polePositionTime && bid.polePositionTime < 1000 * 60 * 2);
  const validSelected: boolean = !!(bid.selectedDriver.grid && bid.selectedDriver.finish); 

  if (![validArrays, validPole, validSelected].every(Boolean)) {
    throw logAndCreateError('failed-precondition', `Bid not valid. Arrays: ${validArrays}, valid selected: ${validSelected}, valid pole: ${validPole}`)
  }
  return doc.update({submitted: true});
}
