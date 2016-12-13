'use strict';

(function() {

class DetailController {

  constructor($http, $scope, socket, cartService) {
    this.cart = cartService;  
    $scope.currentItem =  this.cart.currentItem;
  }

}

angular.module('angularClothesShopApp')
  .controller('DetailController', DetailController);

})();
