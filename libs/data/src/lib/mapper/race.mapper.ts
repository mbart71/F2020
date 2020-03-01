import { ErgastRace, IDriver, IRace } from '../model';
import { DateTime } from 'luxon';

export const map = (source: ErgastRace, selectedDriver: IDriver, previousRace?: IRace, drivers?: IDriver[]): IRace => {
  const raceTime = DateTime.fromISO(`${source.date}T${source.time || '00:00:00Z'}`);
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
    selectedDriver: selectedDriver.driverId,
    drivers: (drivers || []).map(d => d.driverId),
    open: previousRace?.close.startOf('day').plus({ day: 3 }) ?? closeTime.minus({ day: 7 })
  };
};
