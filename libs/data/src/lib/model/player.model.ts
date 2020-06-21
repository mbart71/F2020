export type Role = 'player' | 'admin' | 'bookie' | 'bank-admin' | 'anonymous';

export interface Player {
  uid: string;
  displayName: string;
  photoURL: string;
  email: string;
  roles?: Role[];
  tokens?: string[];
  receiveReminders?: boolean;
  balance?: number;
}
