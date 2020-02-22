import { driver as driverMap, drivers as driversMap } from './driver.mapper';
import { map as raceMap } from './race.mapper';
import { map as seasonMap } from './season.mapper';
import { map as nationalityMap } from './nationality.mapper';

export* from './firebase-utils';
export const mapper = {
  raceMap,
  driverMap,
  driversMap,
  seasonMap,
  nationalityMap,
};
