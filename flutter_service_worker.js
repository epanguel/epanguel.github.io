'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "93a598ceeeb6441288c9aacc591f7f3a",
"assets/AssetManifest.bin.json": "fd0720d7bffee4ff5af267b2f2d6441b",
"assets/AssetManifest.json": "03f6cd594427b4865a2c9a0b82741f70",
"assets/assets/font/static/NotoSansJP-ExtraBold.ttf": "a4f1e854cd8a6816fccea648d4b1b7ac",
"assets/assets/font/static/NotoSansJP-SemiBold.ttf": "c44d4e4829263260330f8a6b181ec9a8",
"assets/assets/img/background/background01.jpg": "8628364edbd2a082008abe507f2aecfa",
"assets/assets/img/background/background02.jpg": "bbe1baefeb432c2d0fd57a91eb6b2854",
"assets/assets/img/background/background03.jpg": "deb7ec293f920875242dc693d78840fd",
"assets/assets/img/background/background04.jpg": "377c0f48ea3272951850546c8ee048d1",
"assets/assets/img/background/background05.jpg": "1eda137393a0a4fdfcd397074233855d",
"assets/assets/img/background/background06.jpg": "2e0b22f62b4bf2fa1606a4dfd7994404",
"assets/assets/img/background/background07.jpg": "8bdaedc990ec19b5a1a40f2bd7771b64",
"assets/assets/img/background/background08.jpg": "d4e511483c5036f15188da45131001e5",
"assets/assets/img/background/background09.jpg": "e73c43d1264eb96927ec054e2aeb04a6",
"assets/assets/img/background/background10.jpg": "02f7def714d736adef8111583e50d623",
"assets/assets/img/background/background11.jpg": "41707a02efa7b6d96a7ab45d97f813e8",
"assets/assets/img/background/background12.jpg": "49c5668bc465e3db0207c4f18e02203d",
"assets/assets/img/background/background13.jpg": "22235df5e9778dca1035d12d3b66e059",
"assets/assets/img/background/background14.jpg": "561ace9f103bead7767a8281db3e5244",
"assets/assets/img/background/entrance01.jpg": "2c769c11e8a5df35751adaa9fbdf75bc",
"assets/assets/json/humans.json": "9e71923ca3e9428843ae1c0b36df5a6b",
"assets/assets/json/keywords.json": "fd682894c9b63282af0f58ab2b3f3d56",
"assets/assets/json/references.json": "1066c7665c3491204ebfc01b70a8541c",
"assets/FontManifest.json": "874365f3c825c91062483ce46dc0f8fd",
"assets/fonts/MaterialIcons-Regular.otf": "4983b4cefa9c94755edc15c998d78b80",
"assets/NOTICES": "3551ac39d573044d69914c2971b7e91c",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "33b7d9392238c04c131b6ce224e13711",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "6cfe36b4647fbfa15683e09e7dd366bc",
"canvaskit/canvaskit.js.symbols": "68eb703b9a609baef8ee0e413b442f33",
"canvaskit/canvaskit.wasm": "efeeba7dcc952dae57870d4df3111fad",
"canvaskit/chromium/canvaskit.js": "ba4a8ae1a65ff3ad81c6818fd47e348b",
"canvaskit/chromium/canvaskit.js.symbols": "5a23598a2a8efd18ec3b60de5d28af8f",
"canvaskit/chromium/canvaskit.wasm": "64a386c87532ae52ae041d18a32a3635",
"canvaskit/skwasm.js": "f2ad9363618c5f62e813740099a80e63",
"canvaskit/skwasm.js.symbols": "80806576fa1056b43dd6d0b445b4b6f7",
"canvaskit/skwasm.wasm": "f0dfd99007f989368db17c9abeed5a49",
"canvaskit/skwasm_st.js": "d1326ceef381ad382ab492ba5d96f04d",
"canvaskit/skwasm_st.js.symbols": "c7e7aac7cd8b612defd62b43e3050bdd",
"canvaskit/skwasm_st.wasm": "56c3973560dfcbf28ce47cebe40f3206",
"favicon.png": "7019fb3e049be4067c98561753d7f2fc",
"flutter.js": "76f08d47ff9f5715220992f993002504",
"flutter_bootstrap.js": "e243260488cd9c070f8884e85bf4f6bb",
"icons/Icon-192.png": "7019fb3e049be4067c98561753d7f2fc",
"icons/Icon-512.png": "7019fb3e049be4067c98561753d7f2fc",
"icons/Icon-maskable-192.png": "7019fb3e049be4067c98561753d7f2fc",
"icons/Icon-maskable-512.png": "7019fb3e049be4067c98561753d7f2fc",
"index.html": "adbda196f783b7ad770d409b0f33a936",
"/": "adbda196f783b7ad770d409b0f33a936",
"main.dart.js": "b30a902c44ad249b82cab481ab1d69f3",
"manifest.json": "873524117beed65913af015b49294822",
"version.json": "d8446ee8c71f9bafec374538234ad123"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
