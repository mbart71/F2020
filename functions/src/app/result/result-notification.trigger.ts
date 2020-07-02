import * as functions from 'firebase-functions';
import { sendMail, WBC, WBCResult } from '../../lib';

const mailbody = (playerName: any, wbcPoints: number, raceName: any) =>
    `<h3>Hej ${playerName}</h3>
     <div> 
     <p> ${raceName} Er nu afgjort - du har fået ${wbcPoints} WBC points til F1 2020 Betting mesterskabet</p>
     </div>     
                  
     Wroouumm,<br/>
     F1emming`;
  
export const wbcPointsTrigger = functions.region('europe-west1').firestore.document('seasons/{seasonId}')
    .onUpdate(async (change: functions.Change<functions.firestore.DocumentSnapshot>, context: functions.EventContext) => {
      const before: WBC = change.before.data().wbc || [];
      const after: WBC = change.after.data().wbc || [];
        if (before.length !== after.length) {
          const result: WBCResult = after[after.length-1];  
          console.log('Race', result.raceName ,'Is now completed- lets send a result mails');
          result.players.forEach(element => {
           return sendMail(element.player.email, result.raceName, mailbody(element.player.displayName, element.points, result.raceName)).then( (msg) => { 
             console.log(`sendMail result :(${msg})`); 
           });
          }); 
        } 
         return null;            
  });