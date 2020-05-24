export type Role = 'player' | 'admin' | 'bookie' | 'bank-admin';

export interface Player {
  uid: string;
  displayName: string;
  photoURL: string;
  email: string;
  roles?: Role[];
  receiveReminders?: boolean;
  balance?: number;
}
