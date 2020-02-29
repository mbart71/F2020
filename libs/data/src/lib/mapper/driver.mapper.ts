import { ErgastDriver, IDriver } from '../model';

export const driver = (d: ErgastDriver): IDriver => {
  return {
    code: d.code,
    nationality: d.nationality,
    name: `${d.givenName} ${d.familyName}`,
    permanentNumber: parseInt(d.permanentNumber, 10),
    url: d.url
  };
};

export const drivers = (_drivers: ErgastDriver[]) => _drivers.map(driver);
