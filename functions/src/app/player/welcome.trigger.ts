import * as functions from 'firebase-functions';
import { Player, sendMail } from '../../lib';


  const mailbody = (player: Player) =>
    `<h3>Hej ${player.displayName}</h3>
    <div> 
    <p> Velkommen til F1 2020 Betting - Din betting konto er nu oprettet, og du kan nu spille med i næste F1 Race</br></p>
    <p> For at spille med skal du gerne have en positiv balance på din konto, du kan overfører penge via MobilePay til F1emming på 28 71 22 34</p>
    </div>     
                  
    Wroouumm,<br/>
    F1emming`;
  
export const WelcomeMailTrigger = functions.region('europe-west1').firestore.document('players/{userId}')
    .onUpdate(async (change, context) => {  
      const playerBefore: Player  = change.before.data() as Player;
      const playerAfter: Player  = change.after.data() as Player;
        if (playerBefore.roles?.includes('anonymous') && playerAfter.roles?.includes('player')) {  
          console.log('player', playerAfter.displayName ,'Is now approved - lets send a welcome mail');
          return sendMail(playerAfter.email, 'Velkommen til F1 2020 Betting', mailbody(playerAfter)).then( (msg) => { 
            console.log(`sendMail result :(${msg})`); 
        });
      }
      return null; 
});    