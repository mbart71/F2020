// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.15.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.15.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyCY1hzs-V5b4f4Zx3yBzBAiawiqr4JaSjQ",
  authDomain: "f1-serverless.firebaseapp.com",
  databaseURL: "https://f1-serverless.firebaseio.com",
  projectId: "f1-serverless",
  storageBucket: "f1-serverless.appspot.com",
  messagingSenderId: "657968084413",
  appId: "1:657968084413:web:9a4fa397037ae453df4ed4",
  measurementId: "G-Q2XDV9KH10"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

