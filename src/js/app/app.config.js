'use strict';

angular.module('myApp').
  config(
    function(
      $locationProvider,
      $routeProvider,
      $mdThemingProvider
    ){
    
      // Use that theme for the primary intentions
      $mdThemingProvider.theme('default')
        .primaryPalette('red')
        .accentPalette('yellow');

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