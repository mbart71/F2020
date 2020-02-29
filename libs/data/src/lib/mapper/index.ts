import { driver as driverMap, drivers as driversMap } from './driver.mapper';
import { driverStanding as driverStandingMap, driverStandings as driverStandingsMap } from './driver-standing.mapper';
import { map as raceMap } from './race.mapper';
import { map as seasonMap } from './season.mapper';
import { map as nationalityMap } from './nationality.mapper';

export const mapper = {
  raceMap,
  driverMap,
  driversMap,
  driverStandingMap,
  driverStandingsMap,
  seasonMap,
  nationalityMap,
};
