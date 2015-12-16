'use strict';

(function() {

  class CartController {

  constructor($http, $scope, socket, cartService) {
    this.cart = cartService;
    this.$http = $http;
    this.items = this.cart.items();
  }

  removeFromCart(product) {
    this.cart.removeItem(product._id);
    this.items = this.cart.items();
  }

  totalCartItems() {
    return this.cart.totalItems();
  }

  totalCartPrice() {
    return this.cart.totalPrice();
  }
}

  angular.module('angularClothesShopApp')
  .controller('CartController', CartController);

})();
