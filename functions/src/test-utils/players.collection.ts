export const players = {
  bookie: {
    roles: [ 'bookie' ],
    email: 'bookie@bookie.dk',
    balance: 40,
    uid: 'bookie-uid',
    displayName: 'F1 Bookie'
  },
  admin: {
    balance: 100,
    uid: 'admin-uid',
    displayName: 'Flemming',
    roles: [ 'admin', 'player', 'bank-admin' ],
    email: 'flemming@flemming.dk'
  },
  player: {
    roles: [ 'player' ],
    email: 'michael@michael.dk',
    uid: 'player-uid',
    balance: 200,
    displayName: 'Michael'
  }
};
