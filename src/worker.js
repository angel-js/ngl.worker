angular.module('ngl.worker', [])

.factory('nglWorker', function ($q) {
  'use strict';

  var worker = function () {
    var deferred = $q.defer();
    return deferred.promise;
  };

  return worker;
});
