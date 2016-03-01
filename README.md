ngl.worker
==========

Angular 1.x bindings to [WebWorkers](https://html.spec.whatwg.org/multipage/workers.html)

**ngl.worker attempts to** provide a cleaner API to use workers from
angular apps without dealing with the worker code

**ngl.worker does not attempt to** recreate the angular environment inside a
worker. For such a task look at [angular-workers](https://github.com/FredrikSandell/angular-workers)

Requirements
------------

  * Workers are supossed to run CPU intensive operations
  * Since workers are isolated from the DOM, a script containing worker code
    has nothing to do with angular
  * Worker scripts will usually have external dependencies
  * Since no module system is expected inside the worker environment, worker
    scripts and its dependencies will use the worker global space to register
    themselves
  * Worker code will usually be executed more than once
  * Creating and destroying such environment would create an unnecessary
    overhead
  * Worker code will usually provide an API with multiple methods. Some sort of
    an RPC interface will be needed
  * Workers will usually emit big chunks of data. `transferable objects` its a
    must

WebWorkers usage
----------------

### Create workers from an external source

```js
var worker = new Worker('worker.js');
```

  * [Can I use `Worker`?](http://caniuse.com/#feat=webworkers) `IE >= 10`

### Create workers with `createObjectURL`

```js
var blob = URL.createObjectURL(new Blob([
  '// worker code here'
], { type: 'application/javascript' }));

var worker = new Worker(blob);
```

  * [Can I use `URL.createObjectURL`?](http://caniuse.com/#feat=bloburls) `IE >= 10`
  * [Can I use `Blob`?](http://caniuse.com/#feat=blob) `IE >= 10`

### Workers communication

```js
worker.onmessage(function (event) {
  console.log(event.data);
});

worker.postMessage({ msg: 'hi there' });
```

### Remove workers

```js
worker.terminate();
```

The `Worker.terminate()` method immediately terminates the Worker. This does not
offer the worker an opportunity to finish its operations; it is simply stopped
at once.

### Inside workers: communication

```js
onmessage = function (msg) {
  postMessage(msg);
};
```

### Inside workers: Access to external resources

WIP

### Transferable objects

```js
Worker.postMessage(aMessage, transferList);
```

  * **aMessage:** The object to deliver to the worker

  * **transferList:** An optional array of `Transferable` objects to transfer
    ownership of. If the ownership of an object is transferred, it becomes
    unusable in the context it was sent from and it becomes available only to
    the worker it was sent to.

    Only MessagePort and ArrayBuffer objects can be transferred.

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

Similar projects
----------------

  * <https://github.com/FredrikSandell/angular-workers>
  * <https://github.com/mattslocum/ng-webworker>

References
----------

  * <https://html.spec.whatwg.org/multipage/workers.html>
  * <https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL>
  * <https://developer.mozilla.org/en-US/docs/Web/API/Blob>
  * <https://developer.mozilla.org/en-US/docs/Web/API/Worker.terminate>
  * <https://developer.mozilla.org/es/docs/Web/API/Transferable>
  * <https://developers.google.com/web/updates/2011/12/Transferable-Objects-Lightning-Fast?hl=en>
  * <https://developer.mozilla.org/en-US/docs/Web/API/Worker/postMessage>
