import { Transaction, accountMap } from '../model/mysq.model'
import { connect } from './mysql.config'
import { resolve } from 'url';

export const readUser = (): Promise<Transaction[]> => {
  //const connection = connect();
  const queryString = 'SELECT account_entry.id, account_entry.DTYPE, account_entry.amount, account_entry.date, account_entry.message, IFNULL( account_entry.to_account_id, account_entry_link.Account_id) AS to_account_id, IFNULL( account_entry.from_account_id, account_entry_link.Account_id) AS from_account_id FROM account_entry LEFT JOIN account_entry_link ON account_entry.id =  account_entry_link.entries_id';
  // Her har du kode der læser fra database og laver det om til Transaction data
  // open the MySQL connection
  return new Promise<Transaction[]>((resolve,reject)=> {
    connect.connect(); 
    connect.query(queryString, (err, rows, fields) => {
      if (err) {
        reject(err)
        return
      } ;
      resolve(rows.map(row=>{
        return <Transaction> {
          amount:row.amount,
          date:new Date(row.date),
          message:row.message, 
          from:accountMap.get(row.from_account_id),
          to:accountMap.get(row.to_account_id),
        }
      }))
   /*   for (var i in rows) {
        console.log(rows[i].amount);
        console.log(rows[i].DTYPE);
        console.log(rows[i].date);
        console.log(rows[i].message);
        console.log(rows[i].to_account_id);
        console.log(accountMap.get(rows[i].to_account_id?.toString()));
        console.log(accountMap.get('1'));
        console.log(rows[i].from_account_id);
        console.log(accountMap.get(rows[i].from_account_id?.toString()));
        var string=JSON.stringify(rows[i]);
        var json =  JSON.parse(string);
        console.log(json);
      } */  
     }); 
    connect.end(); 
  })

}