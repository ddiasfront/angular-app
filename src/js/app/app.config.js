'use strict';

angular.module('myApp').
  config(
    function(
      $locationProvider,
      $routeProvider
    ){

      $locationProvider.html5Mode({
        enabled: true
      })

      $routeProvider.
        when('/', {
          template: "<search-list></search-list>"
        }).
        otherwise({
          template: "Not Found"
        })
    });