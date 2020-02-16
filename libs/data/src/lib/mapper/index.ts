import { map as driverMap } from './driver.mapper';
import { map as raceMap } from './race.mapper';
import { map as seasonMap } from './season.mapper';

export* from './firebase-utils';
export const mapper = {
  raceMap,
  driverMap,
  seasonMap
};
