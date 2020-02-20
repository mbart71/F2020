import { ErgastRace } from '@f2020/ergast';
import { IRace } from '../model/race.model';
import { DateTime } from 'luxon';
import { IDriver } from '../model/driver.model';

export const map = (source: ErgastRace, selectedDriver: IDriver, previousRace?: IRace, drivers?: IDriver[]): IRace => {
  const raceTime = DateTime.fromISO(`${source.date}T${source.time}`);
  const closeTime = raceTime.minus({ minutes: 10, hour: 4, day: 2 });
  return {
    name: source.raceName,
    location: {
      lat: source.Circuit.Location.lat,
      lng: source.Circuit.Location.long,
      nationality: source.Circuit.Location.locality,
      country: source.Circuit.Location.country
    },
    state: 'waiting',
    url: source.url,
    close: closeTime,
    selectedDriver,
    drivers,
    open: previousRace?.close.startOf('day').plus({ day: 3 }) ?? closeTime.minus({ day: 7 })
  };
};
