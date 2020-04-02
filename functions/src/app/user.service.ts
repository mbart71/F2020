import { logAndCreateError } from '../lib/firestore-utils';
import { PlayerImpl } from './../lib/auth.model';
import { getUser } from './../lib/auth.service';
import { Role } from './../lib/model/player.model';

export const validateAccess = async (uid: string | undefined, ...role: Role[]): Promise<boolean> => {
  if (uid) {
    const player: PlayerImpl | undefined = await getUser(uid);

    if (!player) {
      throw logAndCreateError('permission-denied', `${uid} tried to login. No user with specified uid exists`);
    }
    
    if (!player.isInRole('player')) {
      throw logAndCreateError('permission-denied', `${player.displayName} does not have sufficient permissions. Role 'player' required. Has ${player.roles.join(', ')} `)
    }
    return true;
  }
  throw logAndCreateError('permission-denied', `No user was apparently logged in`);
}
