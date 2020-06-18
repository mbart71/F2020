export type Role = 'player' | 'admin' | 'bookie' | 'bank-admin' | 'anonymous';

export interface Player {
  uid: string;
  displayName: string;
  photoURL: string;
  email: string;
  roles?: Role[];
  token?: string;
  receiveReminders?: boolean;
  balance?: number;
}
