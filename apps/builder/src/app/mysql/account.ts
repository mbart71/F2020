import { Transaction, accountMap } from '../model/mysq.model'
import { connect } from './mysql.config'

export const readUser = (playerId: string): Transaction[] => {
  const connection = connect();
  const uid = accountMap.get(playerId);

  if (!uid) {
    throw new Error(`${playerId} not found in account map`);
  }

  // Her har du kode der læser fra database og laver det om til Transaction data


  return [];
}
