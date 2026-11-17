// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyD8oBWqJMYhZnqdPKresifitHHbCvfhAbA",
  authDomain: "olmc2-90b41.firebaseapp.com",
  projectId: "olmc2-90b41",
  storageBucket: "olmc2-90b41.firebasestorage.app",
  messagingSenderId: "984236456405",
  appId: "1:984236456405:web:0e83bd61fdd8548866255c"
});

const messaging = firebase.messaging();

// পেজ বন্ধ থাকা অবস্থায় নোটিফিকেশন আসলে এই কোডটি কাজ করবে
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'https://cdn-icons-png.flaticon.com/512/2662/2662503.png' // আপনার ইচ্ছেমতো আইকন লিংক দিতে পারেন
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});