import * as nodemailer  from 'nodemailer';
import * as functions from 'firebase-functions';

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

export const emailservice  = async (email: string, subject: string, body: string): Promise<void> => {
        const msg = {
             from: 'f1-2020@bregnvig.dk',
             to: email,
             subject: subject,  
             html: body
          };
          return new Promise<void> ( 
            (resolve: (msg: any) => void,  
              reject: (err: Error) => void) => { 
                transporter.sendMail(  
                  msg, (error, info) => { 
                    if (error) { 
                      console.log(`error: ${error}`); 
                      reject(error); 
                    } else { 
                        console.log(`Message Sent 
                          ${info.response}`); 
                        resolve(`Message Sent  
                          ${info.response}`); 
                    } 
                }) 
              } 
          ); 
    }