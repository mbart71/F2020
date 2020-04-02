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
  [4, 'CIQTphNeEfMXGUftQfoKvQt3lp73'],
  [9, 'ttp'],
  [10, 'peter'],
  [11, 'nra'],
  [12, 'killerkim'],
  [13, 'palle'],
  [14, 'dummy14'],
  [15, 'mmathiesen'],
  [16, 'dummy16'],
  [17, 'tnl'],
  [19, 'dalsten'],
  [20, 'dummy20'],
  [21, 'mhoejte'],
  [22, 'dummy22'],
  [23, 'nino'],
  [26, 'RShomwi2DsNj7b00Vpnm0AoUauo1'],
  [27, 'rusche'],
  [30, 'jacob'],
  [31, 'STR'],
  [32, 'jette'],
  [33, 'Alboreto'],
  [34, 'katrine'],
  [35, 'laier'],
  [36, 'heidemeister'],
  [37, 'henrik'],
  [38, 'kaare'],
  [39, 'steffen'],
  [40, 'bruun'],
  [41, 'weile'],
  [42, 'mathias'],
  [43, 'brian'],    
  [44, 'bakkekammen'],
  [45, 'tobias'],    
]);

// accountMap.get('flb');
