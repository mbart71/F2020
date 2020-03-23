import { buildDrivers } from './app/drivers';
import { buildPreviousSeason, buildNewSeason } from './app/season';
import { environment } from './environments/environment';

// buildNewSeason(environment.season)
//   .then(_ => console.log('Completed', _))
//   .catch(error => console.error('Completed with errors', error));
// buildPreviousSeason(environment.season)
//   .then(() => console.log('Completed'))
//   .catch(error => console.error('Completed with errors', error));

buildDrivers()
.then(count => console.log(`Wrote ${count} drivers`));
