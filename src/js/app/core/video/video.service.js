'use strict';

angular.module('video').
  factory('Video', function($resource) {
    return $resource('https://www.googleapis.com/youtube/v3/search?part=id,snippet&q=/:word/&type=video&topicId=/m/04rlf&maxResults=10&key=AIzaSyDd_sfvQ4NASb-k0oKYAr_g9FZcQILtyKc', {word: '@word'}, {
      query:{
        method: "GET",
        // transformRespone
        //interceptor
      },
      get:{
        method: "GET"
      }
    })
  });