// import { getUser } from "../../lib";
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as nodemailer  from 'nodemailer';

const transporter = nodemailer.createTransport( 
    `smtps://michael.bartrup@gmail.com:hoasdcaxmoyexqf@smtp.gmail.com` 
  ); 

/* const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'michael.bartrup@gmail.com',
        pass: 'ohoasdcaxmoyexqf',
    },
}); */ 
    exports.mailNoFunds = functions.firestore.document('player/{userId}').onUpdate((change, context) => {  
      const db = admin.firestore();
      return db.collection('player').doc(context.params.userId).get().then(doc => {
        const player = doc.data();
        
        if ( player?.balance < -80) {  
          console.log('player', player?.displayName ,'has insufficient founds for next race');
           const msg = {
             from: 'f1-2020@bregnvig.dk',
             to: player?.email,
             subject: 'Du kan ikke spille mere',
             html: `<h3>Hej</h3>
              <div>
              <p> Din balance på f2020 er så meget i minus as du ikke kan deltage i næste race 
              </br></p>
              <p> Du kan overfører penge via mobilepay</p>
              </div>
              
              Wroouumm,<br/>
              F1emming`
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
});