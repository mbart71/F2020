import { Transaction, accountMap, Balance } from '../model/mysq.model'
import { connect } from './mysql.config'

export const readUser = (): Promise<Transaction[]> => {
  //const connection = connect();
  //const queryString = '(SELECT  id,DTYPE,amount,date,message,to_account_id,from_account_id from account_entry WHERE from_account_id IS NOT NULL ) UNION (SELECT account_entry.id, account_entry.DTYPE, account_entry.amount, account_entry.date, account_entry.message, IFNULL( account_entry.to_account_id, account_entry_link.Account_id) AS to_account_id, IFNULL( account_entry.from_account_id, account_entry_link.Account_id) AS from_account_id FROM account_entry INNER JOIN account_entry_link ON account_entry.id =  account_entry_link.entries_id WHERE account_entry.from_account_id IS NULL ) ORDER BY ID';
  const queryString = 'SELECT  id,DTYPE,amount,date,message,to_account_id,from_account_id from account_entry WHERE from_account_id IS NOT NULL';
  // Her har du kode der læser fra database og laver det om til Transaction data
  // open the MySQL connection
  return new Promise<Transaction[]>((resolve,reject)=> {
    //connect.connect(); 
    connect.query(queryString, (err, rows) => {
      if (err) {
        reject(err)
        return
      } ;
      resolve(rows.map(row=>{
        return <Transaction> {
          amount:row.amount,
          date:new Date(row.date),
          message:row.message, 
          from:accountMap.get(row.from_account_id) || null,
          to:accountMap.get(row.to_account_id) || null,
        }
      }))
     });
      
    //connect.end(); 
  })
}  
  export const readUserNullNegative = (): Promise<Transaction[]> => {
    //const connection = connect(); 
    //const queryString = '(SELECT  id,DTYPE,amount,date,message,to_account_id,from_account_id from account_entry WHERE from_account_id IS NOT NULL ) UNION (SELECT account_entry.id, account_entry.DTYPE, account_entry.amount, account_entry.date, account_entry.message, IFNULL( account_entry.to_account_id, account_entry_link.Account_id) AS to_account_id, IFNULL( account_entry.from_account_id, account_entry_link.Account_id) AS from_account_id FROM account_entry INNER JOIN account_entry_link ON account_entry.id =  account_entry_link.entries_id WHERE account_entry.from_account_id IS NULL ) ORDER BY ID';
    // const queryStringNull = 'SELECT  id,DTYPE,amount,date,message,to_account_id,from_account_id from account_entry WHERE from_account_id IS NULL'; 
    const queryStringNullNegative = 'SELECT account_entry.id, account_entry.DTYPE, account_entry.amount, account_entry.date, account_entry.message, IFNULL( account_entry.to_account_id, account_entry_link.Account_id) AS to_account_id, IFNULL( account_entry.from_account_id, account_entry_link.Account_id) AS from_account_id FROM account_entry INNER JOIN account_entry_link ON account_entry.id =  account_entry_link.entries_id WHERE account_entry.from_account_id IS NULL AND account_entry.amount < 0';
    // Her har du kode der læser fra database og laver det om til Transaction data
    // open the MySQL connection
    return new Promise<Transaction[]>((resolve,reject)=> {
      connect.connect(); 
      connect.query(queryStringNullNegative, (err, rows) => {
        if (err) {
          reject(err)
          return
        } ;
        resolve(rows.map(row=>{
          return <Transaction> {
            amount:row.amount,
            date:new Date(row.date),
            message:row.message,
            from:accountMap.get(row.from_account_id) || null,
          }
        }))
       });
     // connect.end(); 
    })
}
export const readUserNullPositive = (): Promise<Transaction[]> => {
  //const connection = connect(); 
  //const queryString = '(SELECT  id,DTYPE,amount,date,message,to_account_id,from_account_id from account_entry WHERE from_account_id IS NOT NULL ) UNION (SELECT account_entry.id, account_entry.DTYPE, account_entry.amount, account_entry.date, account_entry.message, IFNULL( account_entry.to_account_id, account_entry_link.Account_id) AS to_account_id, IFNULL( account_entry.from_account_id, account_entry_link.Account_id) AS from_account_id FROM account_entry INNER JOIN account_entry_link ON account_entry.id =  account_entry_link.entries_id WHERE account_entry.from_account_id IS NULL ) ORDER BY ID';
  // const queryStringNull = 'SELECT  id,DTYPE,amount,date,message,to_account_id,from_account_id from account_entry WHERE from_account_id IS NULL';
  const queryStringNullPositive = 'SELECT account_entry.id, account_entry.DTYPE, account_entry.amount, account_entry.date, account_entry.message, IFNULL( account_entry.to_account_id, account_entry_link.Account_id) AS to_account_id, IFNULL( account_entry.from_account_id, account_entry_link.Account_id) AS from_account_id FROM account_entry INNER JOIN account_entry_link ON account_entry.id =  account_entry_link.entries_id WHERE account_entry.from_account_id IS NULL AND account_entry.amount >= 0';
  // Her har du kode der læser fra database og laver det om til Transaction data
  // open the MySQL connection 
  return new Promise<Transaction[]>((resolve,reject)=> {
    //connect.connect(); 
    connect.query(queryStringNullPositive, (err, rows) => {
      if (err) {
        reject(err)
        return
      } ;
      resolve(rows.map(row=>{
        return <Transaction> {
          amount:row.amount,
          date:new Date(row.date),
          message:row.message,
          to:accountMap.get(row.to_account_id) || null,
        }
      }))
     });
    //connect.end(); 
  })
}
export const readBalance = (account): Promise<Balance[]> => {
  //const connection = connect(); 
  //const queryString = '(SELECT  id,DTYPE,amount,date,message,to_account_id,from_account_id from account_entry WHERE from_account_id IS NOT NULL ) UNION (SELECT account_entry.id, account_entry.DTYPE, account_entry.amount, account_entry.date, account_entry.message, IFNULL( account_entry.to_account_id, account_entry_link.Account_id) AS to_account_id, IFNULL( account_entry.from_account_id, account_entry_link.Account_id) AS from_account_id FROM account_entry INNER JOIN account_entry_link ON account_entry.id =  account_entry_link.entries_id WHERE account_entry.from_account_id IS NULL ) ORDER BY ID';
  // const queryStringNull = 'SELECT  id,DTYPE,amount,date,message,to_account_id,from_account_id from account_entry WHERE from_account_id IS NULL';
  const queryStringBalance = 'select balance from Account where id = ?';
  // const queryStringBalance = 'select sum(case when from_account_id = ? then amount end) as redraw, sum(case when to_account_id = ? then amount end) as deposit from account_entry WHERE account_entry.from_account_id IS NOT NULL';
  // const queryStringBalanceNullNegative = 'SELECT sum(account_entry.amount) AS amount FROM account_entry  INNER JOIN account_entry_link ON account_entry.id =  account_entry_link.entries_id WHERE account_entry.from_account_id IS NULL AND account_entry_link.Account_id = ? AND account_entry.amount < 0';
  // const queryStringBalanceNullPositive = 'SELECT sum(account_entry.amount) AS amount FROM account_entry  INNER JOIN account_entry_link ON account_entry.id =  account_entry_link.entries_id WHERE account_entry.to_account_id IS NULL AND account_entry_link.Account_id = ? AND account_entry.amount > 0';
  // Her har du kode der læser fra database og laver det om til Transaction data
  // open the MySQL connection 
  return new Promise<Balance[]>((resolve,reject)=> {
    //connect.connect(); 
    connect.query(queryStringBalance,[account], (err, rows) => {
      if (err) {
        reject(err)
        return
      } ; 
        resolve(rows.map(row=>{
          return <Balance> {
            amount: row.balance,
            uid:accountMap.get(account) || null,
          }
         }))
     });
    //connect.end(); 
  })
}