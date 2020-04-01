import { getUser } from './../lib/auth.service';
import { PlayerImpl } from './../lib/auth.model';
import * as functions from 'firebase-functions';

export type RoleType = 'player' | 'admin';

export const validateAccess = async (uid: string | undefined, ...role: RoleType[]): Promise<boolean> => {
  if (uid) {
    const player: PlayerImpl | undefined = await getUser(uid);

    if (!player) {
      throw new functions.https.HttpsError('permission-denied', `${uid} tried to login. No user with specified uid exists`)
    }
    
    if (!player.isInRole('players')) {
      throw new functions.https.HttpsError('permission-denied', `${player.displayName} does not have sufficient permissions. Role 'player' required. Has ${player.roles.join(', ')} `)
    }
    return true;
  }
  throw new functions.https.HttpsError('permission-denied', `No user was apparently logged in`)
}
