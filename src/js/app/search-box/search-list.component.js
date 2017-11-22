'use strict';

angular.module('searchList').
component('searchList', {
  template: "<h2>{{title}}</h2><ul><li ng-repeat='search in searchResultz'>{{search.snippet.title}}</li></ul>",
  controller: function(Video, $http, $scope, $location, $routeParams) {
 
    Video.query(function(data) {
      $scope.notFound = true
      $scope.searchResultz = data.items
    })

    $scope.title = 'Hello Therez'

    if ( $scope.notFound ) {
      $scope.searchResultz = 'Need Request'
    }
  }
})
// .component('searchList');