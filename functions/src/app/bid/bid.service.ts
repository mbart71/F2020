import { currentSeason } from './../../lib/season.service';
import { getCurrentRace } from './../../lib/race.service';
import * as admin from 'firebase-admin';
import { Bid } from '../../lib';

const noNullsInArray = (array: (string | null)[]): boolean => array.every(Boolean);

export const submitBid = async(uid: string): Promise<admin.firestore.WriteResult> => {
  const season = await currentSeason();
  const race = await getCurrentRace();
  if (!season || !race) {
    console.warn('Missing season or race', season, race);
    return Promise.reject('Either current season or current race was found');
  }
  const doc = admin.firestore().doc(`season/${season.id}/races/${race.location.country}/bids/${uid}`) as admin.firestore.DocumentReference<Bid>;
  const bid = (await doc.get()).data();
  if (!bid) {
    return Promise.reject(`No bid exists for uid: ${uid} for race ${race.location.country}`);
  }
  const validArrays: boolean = Object.values(bid).filter(v => Array.isArray(v)).map(noNullsInArray).every(Boolean);
  const validPole: boolean = !!(bid.polePositionTime && bid.polePositionTime < 1000 * 60 * 2);
  const validSelected: boolean = !!(bid.selectedDriver.grid && bid.selectedDriver.finish); 

  if (![validArrays, validPole, validSelected].every(Boolean)) {
    return Promise.reject(`Bid not valid. Arrays: ${validArrays}, valid selected: ${validSelected}, valid pole: ${validPole}`);
  }
  return doc.update({submitted: true});
}
