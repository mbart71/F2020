import { ErgastDriverResult, IDriverRaceResult } from '../model';
import { driver } from './driver.mapper';
import { basisMap } from './race.mapper';

// "1:25.580"
const toMillis = (time: string) => {
  const groups = /(\d):(\d{2}).(\d{3})/.exec(time);
  const minutes = parseInt(groups[1], 10) * 60 * 1000;
  const seconds = parseInt(groups[2], 10) * 1000;
  const millis = parseInt(groups[3], 10);
  return minutes + seconds + millis;
}

export const driverResult = (result: ErgastDriverResult): IDriverRaceResult => {
  const d = result.Results[0];
  return {
    race: basisMap(result),
    driver: driver(d.Driver),
    points: parseInt(d.points, 10),
    position: parseInt(d.position, 10),
    grid: parseInt(d.grid, 10),
    status: d.status,
    fastestLap: {
      rank: parseInt(d.FastestLap.rank, 10),
      lap: parseInt(d.FastestLap.lap, 10),
      averageSpeed: parseFloat(d?.FastestLap.AverageSpeed.speed),
      time: toMillis(d.FastestLap.Time.time)
    }
  };
};

export const driverResults = (_drivers: ErgastDriverResult[]) => _drivers.map(driverResult);
