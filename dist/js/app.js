'use strict';

var myApp = angular.module('myApp', ['ngRoute', 'ngResource', 'searchList']);

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
    // }

    $scope.searchText = 'Metallica';

    $scope.searchSet = function (newsearchString) {
      $scope.searchText = newsearchString;
    };

    $scope.newQuery = function (newsearchText) {
      //Youtube Request By Input
      $scope.YoutubeNewSearchQuery = Video.query({ word: newsearchText });
      $scope.YoutubeNewSearchQuery.$promise.then(function (result) {
        $scope.YoutubeSearchResults = result.items;
      });
      // Querier(Master, keyword:newsearchText);
      // TicketMaster Request by input
      $scope.TicketMasterNewQuery = Master.query({ keyword: newsearchText });
      $scope.TicketMasterNewQuery.$promise.then(function (result) {
        if (result._embedded) {
          $scope.TicketMasterResults = result._embedded;
          $scope.TicketMasterAttraction = result._embedded.attractions[0];
          $scope.ExternalRepeat = result._embedded.attractions[0];
          console.log(result._embedded.attractions[0]);
        } else {
          $scope.TicketMasterResults = false;
        }
      });
    };

    Video.query(function (data) {
      $scope.notFound = true;
      $scope.YoutubeSearchResults = data.items;
    });

    $scope.title = 'Search for band videos';
    $scope.subtitle = 'The Band Fans Watcher for 2017';

    if ($scope.notFound) {
      $scope.TicketMasterResults = false;
      $scope.YoutubeSearchResults = 'Need Request';
    }
  }]
});
// .component('searchList');;'use strict';

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