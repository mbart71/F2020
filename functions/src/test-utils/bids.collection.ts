import { Bid } from "../lib/model";

export const bids: Bid[] = [
  {
    polePositionTime: 72123,
    podium: [ 'bottas', 'max_verstappen', 'hamilton' ],
    selectedDriver: { grid: 1, finish: 6 },
    fastestDriver: [ 'max_verstappen' ],
    player: {
      uid: 'admin-uid',
      photoURL: 'https://lh3.googleusercontent.com/a-/AAuE7mCwyqRN_i2j54Bx-vSEvBgDbEA5O20pHtpf_7qBQk8',
      email: 'flemming@bregnvig.dk',
      displayName: 'Flemming Bregnvig'
    },
    qualify: [
      'grosjean',
      'bottas',
      'kevin_magnussen',
      'albon',
      'norris',
      'russell'
    ],
    firstCrash: [ 'grojean' ]
  },
  {
    firstCrash: [ 'albon' ],
    polePositionTime: 71111,
    podium: [ 'leclerc', 'vettel', 'max_verstappen' ],
    selectedDriver: { finish: 2, grid: 2 },
    fastestDriver: [ 'vettel' ],
    player: {
      email: 'michael.bartrup@gmail.com',
      displayName: 'Michael Bartrup',
      uid: 'player-uid',
      photoURL: 'https://lh3.googleusercontent.com/a-/AAuE7mBvw300XDtDrnheUmG5TjELjs4ldQKADf15MCQtLg'
    },
    qualify: [
      'bottas',
      'leclerc',
      'vettel',
      'max_verstappen',
      'albon',
      'hamilton'
    ]
  },
  {
    firstCrash: [ 'max_verstappen' ],
    polePositionTime: 71111,
    podium: [ 'hamilton', 'bottas', 'grosjean' ],
    selectedDriver: { finish: 12, grid: 12 },
    fastestDriver: [ 'hamilton' ],
    player: {
      email: 'michael.bartrup@gmail.com',
      displayName: 'Michael Bartrup',
      uid: 'player1-uid',
      photoURL: 'https://lh3.googleusercontent.com/a-/AAuE7mBvw300XDtDrnheUmG5TjELjs4ldQKADf15MCQtLg'
    },
    qualify: [
      'hamilton',
      'grosjean',
      'kevin_magnussen',
      'leclerc',
      'bottas',
      'vettel'
    ]
  }
]
