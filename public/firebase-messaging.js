// This is the background service worker for FCM
importScripts('https://www.gstatic.com/firebasejs/10.4.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.4.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyCTJl3diRr8R7759PVH93JJ_k-H0RNT7Wo",
    authDomain: "swastik-timer.firebaseapp.com",
    projectId: "swastik-timer",
    messagingSenderId: "259328594179",
    appId: "1:259328594179:web:d6c8ba2ade95107ea8d936",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message:', payload);
    self.registration.showNotification(payload.notification.title, {
        body: payload.notification.body,
        icon: '/logo192.png',
    });
});
