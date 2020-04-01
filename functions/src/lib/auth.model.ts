import { Player } from './model'

export class PlayerImpl implements Player  {

  readonly uid: string;
  readonly displayName: string;
  readonly photoURL: string;
  readonly email: string;
  roles: string[];
  balance: number;

  constructor({uid,
    displayName,
    photoURL,
    email,
    roles,
    balance}: Player) {
      this.uid =uid;
      this.displayName = displayName;
      this.photoURL =  photoURL;
      this.email =  email;
      this.roles = [...roles || []];
      this.balance = balance || 0;
  }

  isInRole(role: string): boolean {
    return this.roles.includes(role);
  }
}
