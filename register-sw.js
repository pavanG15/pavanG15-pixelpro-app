if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const swUrl = '/sw.js';

    navigator.serviceWorker.register(swUrl)
      .then((registration) => {
        console.log('ServiceWorker registered with scope:', registration.scope);

        // Update detection
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          console.log('New Service Worker found:', newWorker);

          newWorker.addEventListener('statechange', () => {
            console.log('SW state:', newWorker.state);
            if (newWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                console.log('New content available — refresh recommended.');
              } else {
                console.log('Content cached for offline use.');
              }
            }
          });
        });
      })
      .catch((err) => console.error('ServiceWorker registration failed:', err));
  });

  navigator.serviceWorker.addEventListener('controllerchange', () => {
    console.log('SW controller changed. Reloading…');
  });
}
