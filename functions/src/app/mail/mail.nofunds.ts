import * as functions from 'firebase-functions';
import * as nodemailer  from 'nodemailer';
import { Player } from '../../lib';

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "flemming@bregnvig.dk",
      clientId: functions.config().oauth.client,
      clientSecret: functions.config().oauth.secret,
      refreshToken: functions.config().oauth.refresh,
      accessToken: functions.config().ci.token
    }
  });

export const mailNoFunds = functions.region('europe-west1').firestore.document('players/{userId}')
    .onUpdate(async (change, context) => {  
      const player: Player  = change.after.data() as Player;
        if ((player.balance || 0) - 20 < -100) {  
          console.log('player', player.displayName ,'has insufficient founds for next race');
          const output = `<h3>Hej ${player.displayName}</h3>
              <div> 
              <p> Din balance i f2020 spillet er nu nede på ${player.balance}, du kan derfor ikke lægge et bud ind på næste race </br></p>
              <p> Men du kan overfører penge via MobilePay til F1emming på 28 71 22 34</p>
              </div>     
                            
              Wroouumm,<br/>
              F1emming`;

           const msg = {
             from: 'f1-2020@bregnvig.dk',
             to: player.email,
             subject: 'Du kan ikke spille mere',  
             html: output
          };

          transporter.sendMail( msg, (error,info) => { 
            if (error) { 
             console.log(`error: ${error}`); 
            } 
             console.log(`Message Sent ${info.response}`); 
          }); 
      }  
        return null; 
    });   