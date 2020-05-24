import { ErgastDriversQualifying } from '../model';
import { IQualifyResult } from './../model/race.model';
import { driverQualifying } from './driver-qualifying.mapper';
import { basisMap } from './race.mapper';

export const map = (source: ErgastDriversQualifying): IQualifyResult => {
  return {
    ...basisMap(source),
    results: source.QualifyingResults.map(driverQualifying)
  }
}

// export const mapToBid = (source: IRaceResult, ): Bid => {
//   return <Bid> {
//     qualify: source.
//   }
// } 
