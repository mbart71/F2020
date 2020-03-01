import { ErgastDriverResult, IDriverResult } from '../model';
import { driver } from './driver.mapper';

export const driverResult = (d: ErgastDriverResult): IDriverResult => {
  return {
    driver: driver(d.Driver),
    points: d.points,
    position: d.position,
    grid: d.grid,
    status: d.status,
  };
};

export const driverResults = (_drivers: ErgastDriverResult[]) => _drivers.map(driverResult);
