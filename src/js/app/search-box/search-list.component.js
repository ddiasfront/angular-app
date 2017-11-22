'use strict';

angular.module('searchList').
component('searchList', {
  templateUrl: '/views/videos.html',
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