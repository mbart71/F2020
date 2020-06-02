import { DateTime } from 'luxon';
export interface Transaction {
  from?: string | null;
  to?: string | null;
  date: DateTime;
  involved: string[];
  message: string;
  amount: number;
}
