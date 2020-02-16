import { ErgastSeason } from '@f2020/ergast';
import { ISeason } from '../model/season.model';
import { DateTime } from 'luxon';

export const map = (season: ErgastSeason, latestWBCJoinDate: DateTime): ISeason => {
  return {
    name: `F${season.season}`,
    id: season.season,
    latestWBCJoinDate
  }
};
