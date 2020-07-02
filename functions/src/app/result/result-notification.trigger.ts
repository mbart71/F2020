import * as functions from 'firebase-functions';
import { sendMail, WBC, WBCResult } from '../../lib';

const mailbody = (playerName: any, wbcPoints: number, raceName: any, place: string) =>
    `<h3>Hej ${playerName}</h3>
     <div> 
     <p> ${raceName} Er nu afgjort - du har fået ${wbcPoints} WBC points til F1 2020 Betting mesterskabet</p>
     <p> ${place}
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
            if ([12,10,8,6,4,2,1].indexOf(element.points) > -1)  {
              const place: string = 'Selvom du ikke kom i top tre - så fik du da points :-)'
            }
            if (element.points === 25) { 
              const place: string = 'Tillykke med din første plads :-)'
            }
            if (element.points === 18) { 
              const place: string = 'Tillykke med din anden plads :-)'
            }  
            if (element.points === 15) { 
              const place: string = 'Tillykke med din tredje plads :-)'
            }  
            if (element.points === 0) { 
              const place: string = 'Æv du fik ingen points  :-('
            }  
           return sendMail(element.player.email, result.raceName, mailbody(element.player.displayName, element.points, result.raceName, place)).then( (msg) => { 
             console.log(`sendMail result :(${msg})`); 
           });
          }); 
        } 
         return null;            
  });