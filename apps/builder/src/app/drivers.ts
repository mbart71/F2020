import { getDrivers } from '@f2020/ergast';
import { firebaseUtils, mapper } from '@f2020/data';
import { firebaseApp } from './firebase';

export const buildDrivers = async (): Promise<number> => {
  const db = firebaseApp.datebase;
  const drivers = (await getDrivers().then(ergastDrivers => ergastDrivers.map(mapper.driverMap)))
    .filter(driver => !!driver.code);
  const driverCollection = db.collection('drivers');

  return db.runTransaction(transaction => {
    drivers
      .forEach(driver =>
      transaction.set(driverCollection.doc(driver.code), firebaseUtils.convertTimestamps(driver))
    );
    return Promise.resolve(drivers.length);
  });
};


