ngl.worker
==========

Angular 1.x bindings to [WebWorkers](https://html.spec.whatwg.org/multipage/workers.html)

**ngl.worker attempts to** provide a cleaner API to use workers from
angular apps without dealing with the worker code

**ngl.worker does not attempt to** recreate the angular environment inside a
worker. For such a task look at [angular-workers](https://github.com/FredrikSandell/angular-workers)

Docs
----

  * [WebWorkers usage](doc/webworkers.md)

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

Similar projects
----------------

  * <https://github.com/FredrikSandell/angular-workers>
  * <https://github.com/mattslocum/ng-webworker>
