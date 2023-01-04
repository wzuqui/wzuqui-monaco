export type {};
declare const self: ServiceWorkerGlobalScope;

const promises: Record<string, PromiseLike<Response>> = {};
const resolves: Record<string, (value: Response) => void> = {};

self.addEventListener('fetch', event => {
  const url = event.request.url;
  if (!url.includes('preview-service-worker.io')) {
    return;
  }
  promises[url] = new Promise<Response>(resolve => {
    resolves[url] = resolve;
    setTimeout(() => {
      resolve(
        new Response('timeout response url:' + url, {
          headers: { 'Content-Type': 'text/html' },
          status: 200,
        })
      );
    }, 10000);
  });
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage({
        type: 'page-request',
        url,
      } as PreviewServiceWorker.MessageRequest);
    });
  });
  event.respondWith(promises[url]);
});

self.addEventListener('waiting', function () {
  self.skipWaiting();
});

self.addEventListener('install', function () {
  self.skipWaiting();
});

self.addEventListener(
  'message',
  function (event: PreviewServiceWorker.ExtendableMessageEvent) {
    if (event.data.type === 'page-reload') {
      console.log('page-reload');
      return;
    }
    if (event.data.type === 'page-response') {
      resolves[event.data.url](
        new Response(event.data.body, {
          headers: event.data.headers,
          status: event.data.status,
        })
      );
    } else {
      resolves[event.data.url](
        new Response('message response unknown url:' + event.data.url, {
          headers: { 'Content-Type': 'text/html' },
          status: 200,
        })
      );
    }
  }
);
