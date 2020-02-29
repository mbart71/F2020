import { ErgastDriverStanding, IDriverStanding } from '../model';
import { mapper } from '@f2020/data';

export const driverStanding = (d: ErgastDriverStanding): IDriverStanding => {
  return {
    driver: mapper.driverMap(d.Driver),
    points: d.points,
    wins: d.wins
  };
};

export const driverStandings = (standings: ErgastDriverStanding[]) => standings.map(driverStanding);
