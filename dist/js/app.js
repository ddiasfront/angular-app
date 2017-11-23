'use strict';

var myApp = angular.module('myApp', ['ngRoute', 'ngResource', 'searchList']);

;'use strict';

angular.module('searchList', ["video"]);;'use strict';

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
  controller: ["Video", "$http", "$scope", "$location", "$routeParams", function controller(Video, $http, $scope, $location, $routeParams) {

    $scope.searchText = 'skateboard';

    $scope.searchSet = function (newsearchString) {
      $scope.searchText = newsearchString;
    };

    $scope.newQuery = function (newsearchText) {
      $scope.pica = Video.query({ word: newsearchText });
      $scope.pica.$promise.then(function (result) {
        console.log(result.items);
      });
    };

    Video.query(function (data) {
      $scope.notFound = true;
      $scope.searchResultz = data.items;
    });

    $scope.title = 'Hello Therez';

    if ($scope.notFound) {
      $scope.searchResultz = 'Need Request';
    }
  }]
});
// .component('searchList');;'use strict';


angular.module('video').factory('Video', ["$resource", function ($resource) {
  return $resource('https://www.googleapis.com/youtube/v3/search?part=id,snippet&q=/:word/&type=video&maxResults=10&key=AIzaSyDd_sfvQ4NASb-k0oKYAr_g9FZcQILtyKc', { word: '@word' }, {
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

// angular.
// module('video').
//   factory('Video', function($resource) {
//     let url = 'https://www.googleapis.com/youtube/v3/search?part=id,snippet&q=skateboard&type=video&maxResults=10&key=AIzaSyDd_sfvQ4NASb-k0oKYAr_g9FZcQILtyKc'
//     return $resource(url, {}, {
//       query: {
//         method: "GET",
//         params: {},
//         isArray: true,
//         cache: true,
//         // transformResponse
//         // interceptor
//       },
//       get: {
//         method: "GET",
//         //params: {},
//         isArray: false,
//         cache: true,
//       }
//     })
//   });