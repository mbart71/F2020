import { DateTime } from 'luxon';
export interface Transaction {
  from?: string | null;
  to?: string | null;
  date: DateTime;
  message: string;
  amount: number;
}
