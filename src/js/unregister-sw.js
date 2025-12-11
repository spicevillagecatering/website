// Unregister Service Worker to remove caching
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
        for(let registration of registrations) {
            registration.unregister().then(function(success) {
                if(success) {
                    console.log('Service Worker unregistered successfully');
                }
            });
        }
    });
    
    // Clear all caches
    if ('caches' in window) {
        caches.keys().then(function(names) {
            for (let name of names) {
                caches.delete(name).then(function(success) {
                    if(success) {
                        console.log('Cache deleted:', name);
                    }
                });
            }
        });
    }
}

