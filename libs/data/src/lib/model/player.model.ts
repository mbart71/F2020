export type Role = 'player' | 'admin' | 'bookie';

export interface Player {
  uid: string;
  displayName: string;
  photoURL: string;
  email: string;
  roles?: Role[];
  balance?: number;
}
