import { ErgastSeason } from '../model';
import { getClient } from './axios';

export const getSeason = async (seasonId: string): Promise<ErgastSeason> => {
  return getClient().get(`${seasonId}.json`)
    .then(result => result.data.MRData.RaceTable);
};

