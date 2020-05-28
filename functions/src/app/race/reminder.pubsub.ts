import * as functions from 'firebase-functions';
import { DateTime } from 'luxon';
import { logAndCreateError, getCurrentRace, playerWithoutBid, Player, sendMail, IRace} from '../../lib';

const timespan = (days: number, date: DateTime): boolean => {
  const reminderDate = date.minus({ days });
  return Math.floor(reminderDate.diff(DateTime.local(), 'day').days) === 0;
}

const mailbody = (player: Player, race: IRace, closeday: any, closetime: any) =>
    `<h3>Hej ${player.displayName}</h3>
     <div> 
     <p> ${race.name} - skal snart afvikles, og du mangler stadig af indsende dit bud. Du kan heldigvis stadig nå det, men skynd dig for
     Spillet lukke på ${closeday} klokken ${closetime}</p>
     <p> Du kan spill <a href="https://f2020.bregnvig.dk/">her</a>
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
        const closeday =  race!.close.setLocale('da-DK').toFormat('cccc')
        const closetime =  race!.close.toFormat('T')
        players.forEach(player => {
          console.log(`Should mail to ${player.displayName}`)
          return sendMail(player.email, `Formel 1 vædemål ${race!.name}`, mailbody(player, race!, closeday, closetime)).then( (msg) => { 
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