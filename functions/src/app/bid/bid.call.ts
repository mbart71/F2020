import { seasonsURL, racesURL } from '../../lib/collection-names';
import { Bid, logAndCreateError, PlayerImpl, validateAccess, currentSeason, getCurrentRace, getBookie, Transaction } from "../../lib";
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';


const noNullsInArrayFn = (array: (string | null)[]): boolean => array.every(Boolean);
const uniqueDriversFn = (array: (string | null)[]): boolean => array.length === new Set(array).size;
const validArraysFn = (array: (string | null)[]): boolean => noNullsInArrayFn(array) && uniqueDriversFn(array);

const validateBid = (bid: Bid): void => {
  const validArrays: boolean = Object.values(bid).filter(v => Array.isArray(v)).map(validArraysFn).every(Boolean);
  const validPole: boolean = !!(bid.polePositionTime && bid.polePositionTime < 1000 * 60 * 2);
  const validSelected: boolean = !!(bid.selectedDriver.grid && bid.selectedDriver.finish); 

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
    .catch(errorMessage => {
      throw logAndCreateError('internal', errorMessage)
    });
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

  validateBid(bid);
  validateBalance(player);

  const transactions = db.collection('transactions');
  return db.runTransaction(transaction => {
    transaction.update(doc, {submitted: true});
    transaction.create(transactions.doc(), <Transaction> {
      date: new Date(),
      amount: 20,
      message: `Deltagelse ${race.name}`,
      from: player.uid,
      to: bookie.uid
    })
    return Promise.resolve('Bid submitted');
  })

}
