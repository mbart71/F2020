import { accountMap, Balance } from '../model/mysq.model'
import { connect } from './mysql.config'

export const readBalance = (account): Promise<Balance[]> => {
  connect.connect(); 
  const queryStringBalance = 'select balance from Account where id = ?';
  return new Promise<Balance[]>((resolve,reject)=> {
    connect.query(queryStringBalance,[account], (err, rows) => {
      if (err) {
        reject(err)
        return
      } ; 
        resolve(rows.map(row=>{
          return <Balance> {
            balance: row.balance,
            uid:accountMap.get(account) || null,
          }
         }))
     });
  })
}