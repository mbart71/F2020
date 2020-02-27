export interface Player {
  uid: string;
  displayName: string;
  photoURL: string;
  email: string;
  roles?: string[];
  balance?: number;
}
