import { buildDrivers } from './app/drivers';
import { buildPreviousSeason, buildNewSeason } from './app/season';
import { environment } from './environments/environment';
import { readUser } from './app/mysql/account';
import { Transaction } from './app/model/mysq.model';

// buildNewSeason(environment.season)
//   .then(_ => console.log('Completed', _))
//   .catch(error => console.error('Completed with errors', error));
// buildPreviousSeason(environment.season)
//   .then(() => console.log('Completed'))
//   .catch(error => console.error('Completed with errors', error));

// buildDrivers()
// .then(count => console.log(`Wrote ${count} drivers`));

 readUser().then(transactions => console.log(transactions.slice(0, 10000)));
// Bare skriv de først ti ud
