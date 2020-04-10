import * as firebase from '@firebase/testing';

// export const rules = () => {
//   return require('fs').readFileSync('../../../../firebase/firestore.rules', "utf8");
// }

export function authedApp(projectId: string, auth) {
    const firestore = firebase.initializeTestApp({projectId: projectId, auth}).firestore();
    return firestore;
}

export function adminApp(projectId: string) {
    const firestore = firebase.initializeAdminApp({projectId: projectId}).firestore();
    return firestore;
}

// export function loadFirestoreRules(projectId: string): Promise<void> {
//     return firebase.loadFirestoreRules({projectId: projectId, rules: rules()});
// }

export function clearFirestoreData(projectId: string): Promise<void> {
    return firebase.clearFirestoreData({
        projectId: projectId
    });
}

export function deleteFirestoreApps(): Promise<any[]> {
    return Promise.all(firebase.apps().map(app => app.delete()));
}
