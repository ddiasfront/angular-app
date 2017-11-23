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
      $scope.pica = Video.query({word: newsearchText});
      $scope.pica.$promise.then(function(result) {
        console.log(result.items);
      })
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