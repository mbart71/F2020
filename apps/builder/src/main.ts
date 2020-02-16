import { getDrivers, getSeason } from '@f2020/ergast';
import { environment } from './environments/environment';
import { firebaseUtils, IDriver, IRace, ISeason, mapper } from '@f2020/data';
import { firebaseApp } from './app/firebase';

const random = (max: number): number => Math.floor(Math.random() * Math.floor(max));

const buildPreviousSeason = async () => {

  const ergastSeason = await getSeason(environment.season);

  const usedCodes = new Set<string>();
  const races: IRace[] = await ergastSeason.Races.reduce(async (previousPromise, ergastRace, index: number, ergastRaces) => {
    const acc = await previousPromise;
    const roundDrivers: IDriver[] = (await getDrivers(environment.season, (index + 1).toString(10))).map(mapper.driverMap);
    const selectedDriver = roundDrivers.find(d => d.nationality === ergastRace.Circuit.Location.locality && !usedCodes.has(d.code)) || roundDrivers[random(roundDrivers.length)];
    usedCodes.add(selectedDriver.code);
    acc.push(mapper.raceMap(ergastRace, selectedDriver, index ? acc[index - 1] : null, roundDrivers));
    return Promise.resolve(acc);
  }, Promise.resolve(<IRace[]>[]));

  const season: ISeason = mapper.seasonMap(ergastSeason, races[3].open);
  await firebaseApp.datebase.collection('season').doc(environment.season).set(firebaseUtils.convertDateTimes(season))
    .then(() => {
      const ref = firebaseApp.datebase.doc(`season/${environment.season}`).collection('races');
      const racesWrite = races.map(race => ref.add(firebaseUtils.convertDateTimes(race)));
      return Promise.all(racesWrite);
    });
  //   .catch(error => console.error(error));
};

buildPreviousSeason()
  .then(() => console.log('Completed'))
  .catch(error => console.error('Completed with errors', error));
