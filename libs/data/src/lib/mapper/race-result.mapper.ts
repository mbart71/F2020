import { driverResult } from './driver-result.mapper';
import { IRaceResult } from './../model/race.model';
import { ErgastRaceResult } from '../model';
import { basisMap } from './race.mapper';

export const map = (source: ErgastRaceResult): IRaceResult => {
  return {
    ...basisMap(source),
    results: source.Results.map(driverResult)
  }
}
