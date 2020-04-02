export type Role = 'player' | 'admin'

export interface Player {
  uid: string;
  displayName: string;
  photoURL: string;
  email: string;
  roles?: Role[];
  balance?: number;
}
