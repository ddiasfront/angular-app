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

    //Initial Scope
    $scope.title = 'Search for band videos'
    $scope.subtitle = 'The Band Fans Watcher for 2017'
    $scope.myVar = 'no-class'
    $scope.myVar2 = 'no-class'
    $scope.searchText = 'Metallica'

    $scope.TicketMasterAttractionLinks = false;
    $scope.TicketMasterResults = false

    $scope.searchSet = function(newsearchString){
      $scope.searchText = newsearchString
    }

    $scope.newQuery = function(newsearchText){

      $scope.ShowSocial = false;
      $scope.YoutubeSearchResults = false;
      //Youtube Request By Input
      $scope.YoutubeNewSearchQuery = Video.query({word: newsearchText});
      $scope.YoutubeNewSearchQuery.$promise.then(function(result) {
        $scope.myVar = 'yes-class'
        $scope.YoutubeSearchResults = result.items
      })
      // TicketMaster Request by input
      $scope.TicketMasterNewQuery = Master.query({keyword: newsearchText});
      $scope.TicketMasterNewQuery.$promise.then(function(result) {
        if (result._embedded) {
          $scope.TicketMasterResults = result._embedded;
          $scope.TicketMasterAttractionLinks = result._embedded.attractions[0].externalLinks;
          $scope.TicketMasterAttractionLinksFacebook = result._embedded.attractions[0].externalLinks.facebook[0].url;
          $scope.TicketMasterAttractionLinksHomepage = result._embedded.attractions[0].externalLinks.homepage[0].url;
          $scope.TicketMasterAttractionLinksInstagram = result._embedded.attractions[0].externalLinks.instagram[0].url;
          $scope.TicketMasterAttractionLinksItunes = result._embedded.attractions[0].externalLinks.itunes[0].url;
          $scope.TicketMasterAttractionLinksYoutube = result._embedded.attractions[0].externalLinks.youtube[0].url;
          if( $scope.TicketMasterAttractionLinksFacebook || $scope.TicketMasterAttractionLinksHomepage || $scope.TicketMasterAttractionLinksInstagram || $scope.TicketMasterAttractionLinksItunes || $scope.TicketMasterAttractionLinksYoutube ){
            $scope.ShowSocial = true;
          }
          else {
            debugger
            $scope.ShowSocial = false;
          }
          $scope.myVar2 = 'yes-class'
        }
        else {
          $scope.TicketMasterResults = false;
          $scope.TicketMasterAttractionLinks = false;
          $scope.TicketMasterResults = false;
          $scope.myVar2 = 'no-class';
          $scope.ShowSocial = false;
        }
      })
    }
  }
})
