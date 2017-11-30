self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
});	

self.addEventListener('push', function(event) {
	console.log('[Service Worker] Push Received.');
	console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

	const title = 'Coin Notification';
	const options = {
 		body: event.data.text(),
 		icon: 'images/icon.png',
  	badge: 'images/badge.png'
	};

	event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
	console.log('[Service Worker] Notification click Received.');

	event.notification.close();

	event.waitUntil(
  	clients.openWindow('https://homuchen.me')
	);
});
