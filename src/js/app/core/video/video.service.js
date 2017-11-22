'use strict';


angular.module('video').
  factory('Video', function($resource) {
    let url = 'https://www.googleapis.com/youtube/v3/search?part=id,snippet&q=skateboard&type=video&maxResults=10&key=AIzaSyDd_sfvQ4NASb-k0oKYAr_g9FZcQILtyKc'
    return $resource(url, {}, {
      query:{
        method: "GET",
        // transformRespone
        //interceptor
      },
      get:{
        method: "GET",
      }
    })
  });


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