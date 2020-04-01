import { Role } from './../lib/model/player.model';
import { getUser } from './../lib/auth.service';
import { PlayerImpl } from './../lib/auth.model';
import * as functions from 'firebase-functions';
import { sendError } from '../lib/firestore-utils';

export const validateAccess = async (uid: string | undefined, ...role: Role[]): Promise<boolean> => {
  if (uid) {
    const player: PlayerImpl | undefined = await getUser(uid);

    if (!player) {
      sendError('permission-denied', `${uid} tried to login. No user with specified uid exists`)
    }
    
    if (!player!.isInRole('player')) {
      sendError('permission-denied', `${player!.displayName} does not have sufficient permissions. Role 'player' required. Has ${player!.roles.join(', ')} `)
    }
    return true;
  }
  throw new functions.https.HttpsError('permission-denied', `No user was apparently logged in`)
}
