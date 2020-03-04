import { ErgastDriverResult, IDriverRaceResult } from '../model';
import { driver } from './driver.mapper';
import { basisMap } from './race.mapper';

export const driverResult = (result: ErgastDriverResult): IDriverRaceResult => {
  const d = result.Results[0];
  return {
    race: basisMap(result),
    driver: driver(d.Driver),
    points: parseInt(d.points, 10),
    position: parseInt(d.position, 10),
    grid: parseInt(d.grid, 10),
    status: d.status,
  };
};

export const driverResults = (_drivers: ErgastDriverResult[]) => _drivers.map(driverResult);
