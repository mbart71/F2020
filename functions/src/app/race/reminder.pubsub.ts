import * as functions from 'firebase-functions';
import { DateTime } from 'luxon';
import { logAndCreateError, getCurrentRace, playerWithoutBid } from '../../lib';

const timespan = (days: number, date: DateTime): boolean => {
  const reminderDate = date.minus({ days });
  return Math.floor(reminderDate.diff(DateTime.local(), 'day').days) === 0;
}

// This will be run every day at 9:11 Europe/Copenhagen!
export const mailReminderCrontab = functions.pubsub.schedule('11 9 * * *')
  .timeZone('Europe/Copenhagen')
  .onRun(async () => getCurrentRace('open')
    .then(async race => {
      if (timespan(3, race!.close) || timespan(1, race!.close)) {
        const players = await playerWithoutBid();
        players.forEach(player => console.log(`Should mail to ${player.displayName}`))
      }
      return true;
    })
    .catch(() => {
      throw logAndCreateError('not-found', 'No race')
    })
  );