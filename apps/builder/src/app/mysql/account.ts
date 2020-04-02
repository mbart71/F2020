import { Transaction, accountMap } from '../model/mysq.model'
import { connect } from './mysql.config'
import { resolve } from 'url';

export const readUser = (): Promise<Transaction[]> => {
  //const connection = connect();
  //const queryString = '(SELECT  id,DTYPE,amount,date,message,to_account_id,from_account_id from account_entry WHERE from_account_id IS NOT NULL ) UNION (SELECT account_entry.id, account_entry.DTYPE, account_entry.amount, account_entry.date, account_entry.message, IFNULL( account_entry.to_account_id, account_entry_link.Account_id) AS to_account_id, IFNULL( account_entry.from_account_id, account_entry_link.Account_id) AS from_account_id FROM account_entry INNER JOIN account_entry_link ON account_entry.id =  account_entry_link.entries_id WHERE account_entry.from_account_id IS NULL ) ORDER BY ID';
  const queryString = 'SELECT  id,DTYPE,amount,date,message,to_account_id,from_account_id from account_entry WHERE from_account_id IS NOT NULL';
  const queryStringNull = 'SELECT  id,DTYPE,amount,date,message,to_account_id,from_account_id from account_entry WHERE from_account_id IS NULL';
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
     });
      
    connect.end(); 
  })
  return new Promise<Transaction[]>((resolve,reject)=> {
    connect.connect(); 
    connect.query(queryStringNull, (err, rows, fields) => {
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
     });
      
    connect.end(); 
  })
}