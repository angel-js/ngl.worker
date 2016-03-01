WebWorkers
==========

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
    the worker it was sent to.

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

```js
worker.terminate();
```

The `Worker.terminate()` method immediately terminates the Worker. This does not
offer the worker an opportunity to finish its operations; it is simply stopped
at once.


Inside workers
--------------

### Access to external resources

WIP

References
----------

  * <https://html.spec.whatwg.org/multipage/workers.html>
  * <https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL>
  * <https://developer.mozilla.org/en-US/docs/Web/API/Blob>
  * <https://developer.mozilla.org/en-US/docs/Web/API/Worker.terminate>
  * <https://developer.mozilla.org/es/docs/Web/API/Transferable>
  * <https://developers.google.com/web/updates/2011/12/Transferable-Objects-Lightning-Fast?hl=en>
  * <https://developer.mozilla.org/en-US/docs/Web/API/Worker/postMessage>
