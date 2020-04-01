// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

export * from './app/bid/bid';
