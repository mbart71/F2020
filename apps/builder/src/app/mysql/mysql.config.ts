// Opsæt configuration til MySQL her
import * as mysql from 'mysql'
//export const connect = () => {
export const connect = mysql.createConnection({
  // Her laver du kode til at connect til database. mysql.createConnection({
  //mysql.createConnection({  
   host: "localhost",
   user: "mbart",
   password: "new22pas",
   database: "f2007",
  });
export const getaccount_entry = 'select DTYPE,amount,date,message,to_account_id,from_account_id from account_entry';
// export default getaccount_entry; 