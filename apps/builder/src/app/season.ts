import { getFullSeasonDrivers, getSeason, getSeasonDrivers } from '@f2020/ergast';
import { IDriver, IRace, ISeason, mapper } from '@f2020/data';
import { firebaseApp } from './firebase';
import { WriteResult } from '@google-cloud/firestore';
import { converter } from './converter';

const random = (max: number): number => Math.floor(Math.random() * Math.floor(max));

export const buildNewSeason = async (seasonId: string) => {
  const ergastSeason = await getSeason(seasonId);
  const previousSeasonDrivers: IDriver[] = mapper.driversMap( await getFullSeasonDrivers(`${parseInt(seasonId, 10) - 1}`));

  const usedCodes = new Set<string>();
  const races: IRace[] = ergastSeason.Races.reduce((acc, ergastRace, index) => {
    const nationality = mapper.nationalityMap(ergastRace.Circuit.Location.country);
    const selectedDriver = previousSeasonDrivers.find(d => d.nationality === nationality && !usedCodes.has(d.driverId)) || previousSeasonDrivers[random(previousSeasonDrivers.length)];
    usedCodes.add(selectedDriver.driverId);
    acc.push(mapper.raceMap(ergastRace, selectedDriver, index ? acc[index - 1] : null, !index ? previousSeasonDrivers : null));
    return acc;
  }, [])
  console.log(races.filter(r => !r.open.isValid || !r.close.isValid));
  const season = mapper.seasonMap(ergastSeason, races[3].open);

  return writeSeason(season, races);
}

export const buildPreviousSeason = async (seasonId: string) => {

  const ergastSeason = await getSeason(seasonId);

  const usedDriverIds = new Set<string>();
  const races: IRace[] = await ergastSeason.Races.reduce(async (previousPromise, ergastRace, index: number, ergastRaces) => {
    const acc = await previousPromise;
    const nationality = mapper.nationalityMap(ergastRace.Circuit.Location.country);
    const roundDrivers: IDriver[] = (await getSeasonDrivers(seasonId, (index + 1).toString(10))).map(mapper.driverMap);
    console.log('Round driver ', roundDrivers);
    const selectedDriver = roundDrivers.find(d => d.nationality === nationality && !usedDriverIds.has(d.driverId)) || roundDrivers[random(roundDrivers.length)];
    usedDriverIds.add(selectedDriver.driverId);
    acc.push(mapper.raceMap(ergastRace, selectedDriver, index ? acc[index - 1] : null, roundDrivers));
    return Promise.resolve(acc);
  }, Promise.resolve(<IRace[]>[]));

  const season: ISeason = mapper.seasonMap(ergastSeason, races[3].open);
  return writeSeason(season, races);
  //   .catch(error => console.error(error));
};


const writeSeason = (season: ISeason, races: IRace[]): Promise<WriteResult[]> => {
  return firebaseApp.datebase.collection('season').doc(season.id).withConverter(converter.season).set(season)
    .then(() => {
      const ref = firebaseApp.datebase.doc(`season/${season.id}`).collection('races');
      const racesWrite = races.map(race => ref.doc(race.location.country).withConverter(converter.race).set(race));
      return Promise.all(racesWrite);
    });

}
