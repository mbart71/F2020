import { buildDrivers } from './app/drivers';
import { buildTransactions } from './app/transactions';
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
// Bare skriv de først ti ud
// readUser().then(transactions => console.log(transactions.slice(0, 10)));

buildTransactions()
 .then(count => console.log(`Wrote ${count} transactions`))
 .catch(error => console.error('Completed with errors', error));


// readUser().then(transactions => console.log(transactions.slice(0, 10000)));
// Bare skriv de først ti ud

