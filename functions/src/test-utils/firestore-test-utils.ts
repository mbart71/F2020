import * as firebase from '@firebase/testing';
import * as firebase2 from 'firebase';

export interface AuthedAppData {
  firestore: firebase.firestore.Firestore;
  functions: firebase2.functions.Functions;
}

export const rules = () => {
  return require('fs').readFileSync('../firestore.rules', "utf8");
}


// const allowAll = `
// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {
//     allow read, write;
//   }
// }
// `

export async function authedApp(auth?: object): Promise<AuthedAppData> {
  // await firebase.loadFirestoreRules({projectId: 'f1-serverless', rules: rules()});
    const app = firebase.initializeTestApp({projectId: 'f1-serverless', auth});
    const firestore: firebase.firestore.Firestore = app.firestore(); 
    const functions: firebase2.functions.Functions = app.functions('europe-west1'); 
    // await firebase.loadFirestoreRules({projectId: 'f1-serverless', rules: allowAll});
    functions.useFunctionsEmulator('http://localhost:5001');
    return Promise.resolve({firestore, functions});
}

export function adminApp() {
    const firestore = firebase.initializeAdminApp({projectId: 'f1-serverless'}).firestore();
    return firestore;
}

// export function loadFirestoreRules(projectId: string): Promise<void> {
//     return firebase.loadFirestoreRules({projectId: projectId, rules: rules()});
// }

export function clearFirestoreData(): Promise<void> {
    return firebase.clearFirestoreData({
        projectId: 'f1-serverless'
    });
}

// export function deleteFirestoreApps(): Promise<any[]> {
//     return Promise.all(firebase.apps().map(app => app.delete()));
// }

export const shouldaFailed = () => fail('Should have resulted in an error, when bid is invalid');
export const failedPrecondition = (_: any) => expect(_.code).toEqual('failed-precondition');
export const notFound = (_: any) => expect(_.code).toEqual('not-found');
export const permissionDenied = (_: any) => expect(_.code).toEqual('permission-denied');
export const unauthenticated = (_: any) => expect(_.code).toEqual('unauthenticated');

