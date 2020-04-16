import { DateTime } from 'luxon';
import { transferInTransaction } from './../../lib/transactions.service';
import { seasonsURL, racesURL } from '../../lib/collection-names';
import { Bid, logAndCreateError, PlayerImpl, validateAccess, currentSeason, getCurrentRace, getBookie, internalError, IRace } from "../../lib";
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';


const noNullsInArrayFn = (array: (string | null)[]): boolean => array.every(Boolean);
const uniqueDriversFn = (array: (string | null)[]): boolean => array.length === new Set(array).size;
const validArraysFn = (array: (string | null)[]): boolean => noNullsInArrayFn(array) && uniqueDriversFn(array);

const validateBid = (bid: Bid, race: IRace): void => {
  const lengths = {
    podium: 3,
    qualify: 6,
    fastestDriver: 1,
    firstCrash: 1,
  } as { [key: string]: number}
  const validArrays: boolean = Object.values(bid).filter(v => Array.isArray(v)).map(validArraysFn).every(Boolean) && Object.keys(lengths).every(key => lengths[key] === (bid as any)[key].length );
  const validPole: boolean = !!(bid.polePositionTime && (bid.polePositionTime < (1000 * 60 * 2)) && (bid.polePositionTime > (1000 * 60)));
  const validSelected: boolean = !!(bid.selectedDriver && bid.selectedDriver.grid && bid.selectedDriver.grid > 0 && bid.selectedDriver.grid <= race.drivers!.length
    && bid.selectedDriver.finish && bid.selectedDriver.finish > 0 && bid.selectedDriver.finish <= race.drivers!.length)
  if (![validArrays, validPole, validSelected].every(Boolean)) {
    throw logAndCreateError('failed-precondition', `Bid not valid. Arrays: ${validArrays}, valid selected: ${validSelected}, valid pole: ${validPole}`)
  }
}

const validateBalance = (player: PlayerImpl): void => {
  if ((player.balance || 0) - 20 < -100) {
    throw logAndCreateError('failed-precondition', `${player.displayName} has insufficient funds. Balance: ${(player.balance || 0).toFixed(2)}`)
  }

}

export const submitBid = functions.region('europe-west1').https.onCall(async(data, context) => {
  return validateAccess(context.auth?.uid, 'player')
    .then(player => buildBid(player))
    .then(() => true)
    .catch(internalError);
});

const buildBid = async (player: PlayerImpl) => {
  const season = await currentSeason();
  const race = await getCurrentRace();
  const bookie = await getBookie();

  if (!season || !race) {
    throw logAndCreateError('failed-precondition', 'Missing season or race', season, race);
  }

  const db = admin.firestore();
  const doc = db.doc(`${seasonsURL}/${season.id}/${racesURL}/${race.location.country}/bids/${player.uid}`) as admin.firestore.DocumentReference<Bid>;
  const bid = (await doc.get()).data();
  
  if (!bid) {
    throw logAndCreateError('not-found', `No bid exists for uid: ${player.uid} for race ${race.location.country}`);
  }

  validateBid(bid,race);
  validateBalance(player);

  return db.runTransaction(transaction => {
    transaction.update(doc, {submitted: true});
    transferInTransaction({
      date: DateTime.local(),
      amount: 20,
      message: `Deltagelse ${race.name}`,
      from: player.uid,
      to: bookie.uid,
    }, transaction);
    return Promise.resolve('Bid submitted');
  })

}
