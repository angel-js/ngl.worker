WebWorkers Guide
================

Types Of Workers
----------------

### Dedicated Workers

Accessible from the script that first spawned it

Main article: [Dedicated Workers](doc/dedicated-workers.md)

### Shared Workers

Accessible from multiple scripts

### Service Workers

Using a Service Worker you can easily set an app up to use cached assets first,
thus providing a default experience even when offline, before then getting more
data from the network (commonly known as [Offline First](http://offlinefirst.org/)).

References
----------

  * <https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers>
  * <https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Functions_and_classes_available_to_workers>
  * <https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker>
  * <https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers>
