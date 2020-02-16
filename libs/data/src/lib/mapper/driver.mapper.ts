import { ErgastDriver } from '@f2020/ergast';
import { DriverModel, IDriver } from '../model/driver.model';

export const map = (driver: ErgastDriver): IDriver => {
  return {
    code: driver.code,
    nationality: driver.nationality,
    name: `${driver.givenName} ${driver.familyName}`,
    permanentNumber: parseInt(driver.permanentNumber, 10),
    url: driver.url
  };
};
