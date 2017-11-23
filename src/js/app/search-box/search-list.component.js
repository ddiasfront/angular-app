'use strict';

angular.module('searchList').
component('searchList', {
  templateUrl: '/views/videos.html',
  controller: function(Video, $http, $scope, $location, $routeParams) {
 
    $scope.searchText = 'skateboard'

    $scope.searchSet = function(newsearchString){
      $scope.searchText = newsearchString
    }

    $scope.newQuery = function(newsearchText){
      $scope.newScopeQuery = Video.query({word: newsearchText});
      console.log($scope.newScopeQuery);
    }

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