importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
if (workbox) {
  console.log(`Workbox berhasil dimuat`);
}
else
  console.log(`Workbox gagal dimuat`);

  workbox.precaching.precacheAndRoute([
    {url: '/', revision: '1'},
    {url: '/index.html', revision: '1'},
    {url: '/infoTeam.html', revision: '1'},
    {url: '/nav.html', revision: '1'},
    {url: '/teamList.html', revision: '1'},
    {url: '/pages/contact.html', revision: '1'},
    {url: '/pages/favorite.html', revision: '1'},
    {url: '/pages/home.html', revision: '1'},
    {url: '/css/materialize.min.css', revision: '1'},
    {url: '/css/style.css', revision: '1'},
    {url: '/js/view/areas.js', revision: '1'},
    {url: '/js/view/favorite-info.js', revision: '1'},
    {url: '/js/view/favorite-team.js', revision: '1'},
    {url: '/js/view/info-team.js', revision: '1'},
    {url: '/js/view/show-delete.js', revision: '1'},
    {url: '/js/view/show-preload.js', revision: '1'},
    {url: '/js/view/teams.js', revision: '1'},
    {url: '/js/api.js', revision: '1'},
    {url: '/js/app.js', revision: '1'},
    {url: '/js/db.js', revision: '1'},
    {url: '/js/idb.js', revision: '1'},
    {url: '/js/materialize.min.js', revision: '1'},
    {url: '/js/nav.js', revision: '1'},
    {url: '/js/reg-notif.js', revision: '1'},
    {url: '/js/reg-sw.js', revision: '1'},
    {url: '/assets/foto.jpg', revision: '1'},
    {url: '/assets/image-not-found.png', revision: '1'},
    {url: '/assets/logo1.png', revision: '1'},
    {url: '/assets/logo2.png', revision: '1'},
    {url: '/assets/logo3.png', revision: '1'},
    {url: '/assets/maskable_icon.png', revision: '1'},
    {url: '/assets/maskable_icon1.png', revision: '1'},
    {url: '/assets/no.png', revision: '1'},
    {url: '/assets/yes.png', revision: '1'},
    {url: '/manifest.json', revision: '2'},
    {url: '/push.js', revision: '1'}
  ], {
  ignoreUrlParametersMatching: [/.*/]
  });

  workbox.routing.registerRoute(
    new RegExp('/pages'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'pages'
    })
  );

  workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|webp|svg)$/,
    new workbox.strategies.CacheFirst({
      cacheName: 'images',
      plugins: [
        new workbox.expiration.Plugin({
          maxAgeSeconds: 30 * 24 * 60 * 60, //30 days
          maxEntries: 60,
        }),
      ],
    })
  );

  workbox.routing.registerRoute(
    new RegExp("https://api.football-data.org/v2/"),
    new workbox.strategies.NetworkFirst({
      // networkTimeoutSeconds: 7,
      cacheName: 'football-data',
      plugin: [
        new workbox.expiration.Plugin({
          maxEntries: 30,
          maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
        }),
      ],
    })
  );

  workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'google-fonts',
    })
  )

  workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'google-fonts-webfonts',
      plugins: [
        new workbox.expiration.Plugin({
          maxAgeSeconds: 60 * 60 * 24 * 365,
          maxEntries: 30
        })
      ]
    })
  )

  workbox.routing.registerRoute(
    /\.(?:js|css)$/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'static-resources',
    })
  );

self.addEventListener('notificationclick', function (event) {
    event.notification.close();

    if (!event.action) {
      // Penguna menyentuh area notifikasi diluar action
      console.log('Notification Click.');
      return;
    }
    switch (event.action) {
      case 'yes-action':
        console.log('Pengguna memilih action yes.');
        // buka tab baru
        clients.openWindow('https://google.com');
        break;
      case 'no-action':
        console.log('Pengguna memilih action no');
        break;
      default:
        console.log(`Action yang dipilih tidak dikenal: '${event.action}'`);
        break;
    }
  });

  self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
      body = event.data.text();
    } else {
      body = 'Push message no payload';
    }
    var options = {
      body: body,
      icon: 'assets/logo2.png',
      badge: 'assets/logo3.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    event.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
  });

    
