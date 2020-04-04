export interface Transaction {
  from: string | null;
  to: string | null;
  date: Date;
  message: string;
  amount: number;
}
