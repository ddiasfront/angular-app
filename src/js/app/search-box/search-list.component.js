'use strict';

angular.module('searchList').
component('searchList', {
  template: "<h2>{{title}}</h2>",
  controller: function($http, $scope) {

    const searchForMe = (inputString) => {
      let baseUrl = 'https://www.googleapis.com/youtube/v3/search?part=id&q=skateboard&type=video&maxResults=10&key=AIzaSyDd_sfvQ4NASb-k0oKYAr_g9FZcQILtyKc'
    }

    let baseUrl = 'https://www.googleapis.com/youtube/v3/search?part=id&q=skateboard&type=video&maxResults=10&key=AIzaSyDd_sfvQ4NASb-k0oKYAr_g9FZcQILtyKc'

    const sucessCallBack = (response) => {
      console.log(response);
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