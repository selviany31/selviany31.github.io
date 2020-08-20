var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BKZMOZtxkSncG1-NM_piw5kRqDmkIVY7fuUUu7eb7uF_wlyIOkPQHMVhv0AB2b4iPAFKa_Lyzafk0hNqqAuQ2BQ",
    "privateKey": "KYOAuHH8kQ01yfL4F1u0qB-QLig5pSZdvT1e1glcjos"
};

webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/fsJElufonoo:APA91bGVPlEgHOkeD82StuwvE7pntbdsf1YknXhR4wm__nTAdh-_QhWiVNUhvzHId9Wp2fxcXLyIRVlugVEyDNyXvzaRcjvikW0_9u311YUv-vQF6TzG9qTa5HEHGFZbCZGBrdwiG90A",
    "keys": {
        "p256dh": "BJ3/c4Drtq5cA7SpgGN8Lg8CtE7hKEBzG3Cl81zkG1blnkBzMEWSUTFQdbj9EOFI9jlnNQLo0UndnCbl+QqnxCE=",
        "auth": "kufjHdb1AnB5T6SN0LkLcQ=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
    gcmAPIKey: '379485860023',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);