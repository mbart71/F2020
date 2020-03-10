import { ErgastDriverQualifying, ErgastDriverResult, IDriverQualifying, IDriverRaceResult } from '../model';
import { driver } from './driver.mapper';
import { basisMap } from './race.mapper';

export const driverQualifying = (result: ErgastDriverQualifying): IDriverQualifying => {
  const d = result.QualifyingResults[0];
  return {
    race: basisMap(result),
    driver: driver(d.Driver),
    position: parseInt(d.position, 10),
    q1: d.Q1,
    q2: d.Q2,
    q3: d.Q3,
  };
};

export const driverQualifyings = (_drivers: ErgastDriverQualifying[]) => _drivers.map(driverQualifying);
