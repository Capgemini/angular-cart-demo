'use strict';

angular.module('angularClothesShopApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('products', {
        url: '/',
        templateUrl: 'app/products/products.html',
        controller: 'ProductsController',
        controllerAs: 'products'
      });
  });
