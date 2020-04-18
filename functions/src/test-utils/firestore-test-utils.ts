import * as firebase from '@firebase/testing';
import * as firebase2 from 'firebase';

export interface AuthedAppData {
  firestore: firebase.firestore.Firestore;
  functions: firebase2.functions.Functions;
}

export async function authedApp(auth?: object): Promise<AuthedAppData> {
  const app = firebase.initializeTestApp({ projectId: 'f1-serverless', auth });
  const firestore: firebase.firestore.Firestore = app.firestore();
  const functions: firebase2.functions.Functions = app.functions('europe-west1');
  functions.useFunctionsEmulator('http://localhost:5001');
  return Promise.resolve({ firestore, functions });
}

export function adminApp() {
  const firestore = firebase.initializeAdminApp({ projectId: 'f1-serverless' }).firestore();
  return firestore;
}

export function clearFirestoreData(): Promise<void> {
  return firebase.clearFirestoreData({
    projectId: 'f1-serverless'
  });
}

export const shouldaFailed = () => fail('Should have resulted in an error, when bid is invalid');
export const failedPrecondition = (_: any) => expect(_.code).toEqual('failed-precondition');
export const notFound = (_: any) => expect(_.code).toEqual('not-found');
export const permissionDenied = (_: any) => expect(_.code).toEqual('permission-denied');
export const unauthenticated = (_: any) => expect(_.code).toEqual('unauthenticated');

