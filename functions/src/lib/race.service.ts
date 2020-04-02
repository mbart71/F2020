import { currentSeason } from './season.service';
import { IRace } from "./model";
import * as admin from 'firebase-admin';
import { converter} from './';

export const getCurrentRace = async (): Promise<IRace | undefined> => {
  return currentSeason().then(season => admin.firestore()
    .collection(`season/${season.id}/races`)
    .where('state', '==', 'open')
    .withConverter<IRace>(converter.timestamp)
    .get()
    .then(snapshot => {
      if (snapshot.docs.length === 1) {
        return snapshot.docs[0].data();
      } else if(snapshot.docs.length > 1) {
        return Promise.reject(`Found ${snapshot.docs.length} with state open`);
      }
      return undefined;
    }));
}
