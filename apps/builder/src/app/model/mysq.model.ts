export interface Transaction {
  from: string;
  to?: string;
  date: Date;
  message: string;
  amount: number;
}

export const accountMap = new Map<string, string>([
  ['flb', 'i18w2Ol5jqQVxUz11VZbiC1Mlqp2']
])

accountMap.get('flb');
