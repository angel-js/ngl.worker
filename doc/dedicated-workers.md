Dedicated Workers
=================

Create workers
--------------

### From an external source

```js
var worker = new Worker('worker.js');
```

  * [Can I use `Worker`?](http://caniuse.com/#feat=webworkers) `IE >= 10`

### With `createObjectURL`

```js
var blob = URL.createObjectURL(new Blob([
  '// worker code here'
], { type: 'application/javascript' }));

var worker = new Worker(blob);
```

  * [Can I use `URL.createObjectURL`?](http://caniuse.com/#feat=bloburls) `IE >= 10`
  * [Can I use `Blob`?](http://caniuse.com/#feat=blob) `IE >= 10`

Message passing
---------------

### Main thread

```js
worker.onmessage(function (event) {
  console.log(event.data);
});

worker.postMessage({ msg: 'hi there' });
```

### Worker

```js
onmessage = function (msg) {
  postMessage(msg);
};
```

### Transferable objects

```js
Worker.postMessage(aMessage, transferList);
```

  * **aMessage:** The object to deliver to the worker

  * **transferList:** An optional array of `Transferable` objects to transfer
    ownership of. If the ownership of an object is transferred, it becomes
    unusable in the context it was sent from and it becomes available only to
    the context it was sent to.

    Only `MessagePort` and `ArrayBuffer` objects can be transferred.

Feature detection

```js
var hasTransferables = function () {
  var worker = new Worker();
  worker.postMessage = worker.webkitPostMessage || worker.postMessage;
  var ab = new ArrayBuffer(1);
  worker.postMessage(ab, [ab]);
  if (ab.byteLength) { return false; }
  return true;
};
```

Remove workers
--------------

### Main thread

The `Worker.terminate()` method immediately terminates the Worker. This does not
offer the worker an opportunity to finish its operations; it is simply stopped
at once.

```js
worker.terminate();
```

### Worker

```js
close();
```

Import scripts
--------------

The browser loads each listed script and executes it. Any global objects from
each script may then be used by the worker.

If the script can't be loaded, `NETWORK_ERROR` is thrown, and subsequent code
will not be executed.

```js
importScripts('foo.js');
importScripts('foo.js', 'bar.js');
```

Spawning sub-workers
--------------------

Sub-workers must be hosted within the **same origin** as the parent page. Also,
the URIs for subworkers are resolved relative to the parent worker's location
rather than that of the owning page.

Error handling
--------------

When a runtime error occurs in the worker, its `onerror` event handler is called

```js
worker.onerror(function (event) {
  console.log({
    filename: event.filename,
    lineno: event.lineno,
    message: event.message
  });
});
```

Inside workers
--------------

### Properties and methods

  * `self`: Reference to the global context
  * `close()`: discards any tasks queued in the worker's event loop, effectively
    closing this particular scope.
  * `importScripts()`: Synchronously imports one or more scripts into the
    worker's scope
  * `postMessage()`: Sends a message to the main thread that spawned it

### APIs

  * `Fetch`
  * `FileReader`
  * `IndexedDB`
  * `XMLHttpRequest`
  * `WebSocket`
  * `Worker`

References
----------

  * <https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers>
  * <https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Functions_and_classes_available_to_workers>
