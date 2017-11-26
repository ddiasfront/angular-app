'use strict';

angular.module('searchList').
component('searchList', {
  templateUrl: '/views/videos.html',
  controller: function(Video, Master, $http, $scope, $location, $routeParams) {
 
    // const Querier = (ModuleFactory, SearchParameter) => {
    //   debugger
    //   // let ResultQuery = ModuleFactory.toString() + 'Results'
    //   // $scope.ModuleFactory = ModuleFactory.query({SearchParameter});
    //   // $scope.ModuleFactory.$promise.then(function (result) {
    //   //   $scope.ResultQuery = result.items;
    //   //   console.log(result.items);
    //   // }) 
    // }
 
    $scope.searchText = 'Metallica'

    $scope.searchSet = function(newsearchString){
      $scope.searchText = newsearchString
    }

    $scope.newQuery = function(newsearchText){
      //Youtube Request By Input
      $scope.YoutubeNewSearchQuery = Video.query({word: newsearchText});
      $scope.YoutubeNewSearchQuery.$promise.then(function(result) {
        $scope.YoutubeSearchResults = result.items
      })
      // Querier(Master, keyword:newsearchText);
      // TicketMaster Request by input
      $scope.TicketMasterNewQuery = Master.query({keyword: newsearchText});
      $scope.TicketMasterNewQuery.$promise.then(function(result) {
        if (result._embedded) {
          $scope.TicketMasterResults = result._embedded;
          $scope.TicketMasterAttraction = result._embedded.attractions[0];
          $scope.ExternalRepeat = result._embedded.attractions[0];
          console.log(result._embedded.attractions[0]);
        }
        else {
          $scope.TicketMasterResults = false
        }
      })
    }

    Video.query(function(data) {
      $scope.notFound = true
      $scope.YoutubeSearchResults = data.items
    })

    $scope.title = 'Search for band videos'
    $scope.subtitle = 'The Band Fans Watcher for 2017'

    if ( $scope.notFound ) {
      $scope.TicketMasterResults = false
      $scope.YoutubeSearchResults = 'Need Request'
    }
  }
})
// .component('searchList');