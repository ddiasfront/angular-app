'use strict';

angular.module('ticketmaster').
  factory('Master', function($resource) {
    return $resource('https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=q2GNlCrgGo6c8uej3Ib4MsbAC2KIr5nG&keyword=:keyword', {keyword: '@keyword'}, {
      query:{
        method: "GET"
      },
      get:{
        method: "GET"
      }
    })
  });


 