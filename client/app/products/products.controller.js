'use strict';

(function() {

  class ProductsController {

  constructor($http, $scope, socket, cartService) {
    this.cart = cartService;
    this.$http = $http;
    this.products = [];

    $http.get('/api/products').then(response => {
      this.products = response.data;
      socket.syncUpdates('product', this.products);
    });

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('product');
    });
  }

  addToCart(product) {
    if (product.quantity > this.cart.itemQuantity(product._id)) {
      this.cart.addItem(product._id, product.name, product.price, 1);
    }
  }

  removeFromCart(product) {
    this.cart.removeItem(product._id);
  }

  productInCart(product) {
    return this.cart.containsItem(product._id);
  }
}

  angular.module('angularClothesShopApp')
  .controller('ProductsController', ProductsController);

})();
