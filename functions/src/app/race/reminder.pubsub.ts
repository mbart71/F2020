import * as functions from 'firebase-functions';
import { DateTime } from 'luxon';
import { logAndCreateError, getCurrentRace, playerWithoutBid, Player, sendMail, IRace} from '../../lib';

const timespan = (days: number, date: DateTime): boolean => {
  const reminderDate = date.minus({ days });
  return Math.floor(reminderDate.diff(DateTime.local(), 'day').days) === 0;
}

const mailBody = (player: Player, race: IRace, closeDay: any, closeTime: any) =>
    `<h3>Hej ${player.displayName}</h3>
     <div> 
     <p> ${race.name} - lukker snart og du har ikke spillet endnu!. Du kan heldigvis stadig nå det, men skynd dig for
     Spillet lukke på ${closeDay} klokken ${closeTime}</p>
     <p> Du kan spille <a href="https://f2020.bregnvig.dk/">her</a>
     </div>     
                  
     Wroouumm,<br/>
     F1emming`;

// This will be run every day at 9:11 Europe/Copenhagen!
export const mailReminderCrontab = functions.pubsub.schedule('11 9 * * *')
  .timeZone('Europe/Copenhagen')
  .onRun(async () => getCurrentRace('open')
    .then(async race => {
      if (timespan(3, race!.close) || timespan(1, race!.close)) {
        const players = await playerWithoutBid();
        const closeDay =  race!.close.setLocale('da-DK').toFormat('cccc')
        const closeTime =  race!.close.toFormat('T')
        players.forEach(player => {
          console.log(`Should mail to ${player.displayName}`)
          return sendMail(player.email, `Formel 1 vædemål ${race!.name}`, mailBody(player, race!, closeDay, closeTime)).then( (msg) => { 
            console.log(`sendMail result :(${msg})`) 
          })
        })
      }
      return true;
    })
    .catch(() => {
      throw logAndCreateError('not-found', 'No race')
    })
  );