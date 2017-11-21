'use strict';

angular.module('searchList').
component('searchList', {
  template: "<h2>{{title}}</h2><ul><li ng-repeat='search in searchResultz'>{{search.snippet.title}}</li></ul>",
  controller: function(Video, $http, $scope) {
    
    console.log(Video.query())
    console.log(Video.get())
    
    const searchForMe = (inputString) => {
      let baseUrl = 'https://www.googleapis.com/youtube/v3/search?part=id&q=skateboard&type=video&maxResults=10&key=AIzaSyDd_sfvQ4NASb-k0oKYAr_g9FZcQILtyKc'
    }

    let baseUrl = 'https://www.googleapis.com/youtube/v3/search?part=id,snippet&q=skateboard&type=video&maxResults=10&key=AIzaSyDd_sfvQ4NASb-k0oKYAr_g9FZcQILtyKc'

    const sucessCallBack = (response) => {
      console.log(response);
      let searchResult = response.data.items
      $scope.searchResultz = searchResult ? searchResult : 'No resultz';
    }
    

    const errorCallBack = ( response) => {
      console.log(response);
    }


    $http.get(baseUrl).then(sucessCallBack, errorCallBack);
    console.log('SEARCH LIST CONTROLLER');
    $scope.title = 'Hello Therez'
  }
})
// .component('searchList');