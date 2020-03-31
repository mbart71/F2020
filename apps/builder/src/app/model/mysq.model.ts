export interface Transaction {
  from?: string;
  to?: string;
  date: Date;
  message: string;
  amount: number;
};

export const accountMap = new Map<number, string>([
  [1, 'i18w2Ol5jqQVxUz11VZbiC1Mlqp2'],
  [8, 'tdaLwa33t9gZ2n3rTbmQMW7CgbT2'],
]);

// accountMap.get('flb');
