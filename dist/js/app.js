'use strict';

var myApp = angular.module('myApp', ['ngRoute', 'ngResource', 'ngAnimate', 'searchList']);

;'use strict';

angular.module('searchList', ["video", "ticketmaster"]);;'use strict';

angular.module('ticketmaster', []);;'use strict';

angular.module('video', []);;'use strict';

angular.module('myApp').config(["$locationProvider", "$routeProvider", function ($locationProvider, $routeProvider) {

  $locationProvider.html5Mode({
    enabled: true
  });

  $routeProvider.when('/', {
    template: "<search-list></search-list>"
  }).otherwise({
    template: "Not Found"
  });
}]);;'use strict';

angular.module('searchList').component('searchList', {
  templateUrl: '/views/videos.html',
  controller: ["Video", "Master", "$http", "$scope", "$location", "$routeParams", function controller(Video, Master, $http, $scope, $location, $routeParams) {

    // const Querier = (ModuleFactory, SearchParameter) => {
    //   debugger
    //   // let ResultQuery = ModuleFactory.toString() + 'Results'
    //   // $scope.ModuleFactory = ModuleFactory.query({SearchParameter});
    //   // $scope.ModuleFactory.$promise.then(function (result) {
    //   //   $scope.ResultQuery = result.items;
    //   //   console.log(result.items);
    //   // }) 

    //Initial Scope
    $scope.title = 'Search for band videos';
    $scope.subtitle = 'The Band Fans Watcher for 2017';
    $scope.myVar = 'no-class';
    $scope.myVar2 = 'no-class';
    $scope.searchText = 'Metallica';

    $scope.TicketMasterAttractionLinks = false;
    $scope.TicketMasterResults = false;

    $scope.searchSet = function (newsearchString) {
      $scope.searchText = newsearchString;
    };

    $scope.newQuery = function (newsearchText) {

      $scope.ShowSocial = false;
      $scope.YoutubeSearchResults = false;
      //Youtube Request By Input
      $scope.YoutubeNewSearchQuery = Video.query({ word: newsearchText });
      $scope.YoutubeNewSearchQuery.$promise.then(function (result) {
        $scope.myVar = 'yes-class';
        $scope.YoutubeSearchResults = result.items;
      });
      // TicketMaster Request by input
      $scope.TicketMasterNewQuery = Master.query({ keyword: newsearchText });
      $scope.TicketMasterNewQuery.$promise.then(function (result) {
        if (result._embedded) {
          $scope.TicketMasterResults = result._embedded;
          $scope.TicketMasterAttractionLinks = result._embedded.attractions[0].externalLinks;
          $scope.TicketMasterAttractionLinksFacebook = result._embedded.attractions[0].externalLinks.facebook[0].url;
          $scope.TicketMasterAttractionLinksHomepage = result._embedded.attractions[0].externalLinks.homepage[0].url;
          $scope.TicketMasterAttractionLinksInstagram = result._embedded.attractions[0].externalLinks.instagram[0].url;
          $scope.TicketMasterAttractionLinksItunes = result._embedded.attractions[0].externalLinks.itunes[0].url;
          $scope.TicketMasterAttractionLinksYoutube = result._embedded.attractions[0].externalLinks.youtube[0].url;
          if ($scope.TicketMasterAttractionLinksFacebook || $scope.TicketMasterAttractionLinksHomepage || $scope.TicketMasterAttractionLinksInstagram || $scope.TicketMasterAttractionLinksItunes || $scope.TicketMasterAttractionLinksYoutube) {
            $scope.ShowSocial = true;
          } else {
            debugger;
            $scope.ShowSocial = false;
          }
          $scope.myVar2 = 'yes-class';
        } else {
          $scope.TicketMasterResults = false;
          $scope.TicketMasterAttractionLinks = false;
          $scope.TicketMasterResults = false;
          $scope.myVar2 = 'no-class';
          $scope.ShowSocial = false;
        }
      });
    };
  }]
});'use strict';

angular.module('ticketmaster').factory('Master', ["$resource", function ($resource) {
  return $resource('https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=q2GNlCrgGo6c8uej3Ib4MsbAC2KIr5nG&keyword=:keyword', { keyword: '@keyword' }, {
    query: {
      method: "GET"
    },
    get: {
      method: "GET"
    }
  });
}]);

;'use strict';

angular.module('video').factory('Video', ["$resource", function ($resource) {
  return $resource('https://www.googleapis.com/youtube/v3/search?part=id,snippet&q=/:word/&type=video&topicId=/m/04rlf&maxResults=10&key=AIzaSyDd_sfvQ4NASb-k0oKYAr_g9FZcQILtyKc', { word: '@word' }, {
    query: {
      method: "GET"
      // transformRespone
      //interceptor
    },
    get: {
      method: "GET"
    }
  });
}]);