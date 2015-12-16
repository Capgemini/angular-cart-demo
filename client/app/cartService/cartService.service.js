'use strict';

angular.module('angularClothesShopApp')
  .service('cartService', function () {

    var items = {};

    this.addItem = function(id, name, price, quantity) {
      if (!this.containsItem(id)) {
        items[id] = {_id: id, name: name, price: price, quantity: quantity};
      } else {
        items[id].quantity += 1;
      }
    };

    this.removeItem = function(id) {
      if (this.containsItem(id)) {
        items[id].quantity > 1 ? items[id].quantity-- : delete items[id];

        return true;
      }
      return false;
    };

    this.containsItem = function(id) {
      return id in items;
    };


    this.totalItems = function() {
      var total = 0;
      for (var index in items) {
        total += items[index].quantity;
      }
      return total;
    };

    this.itemQuantity = function(id) {
      if (this.containsItem(id)) {
        return items[id].quantity;
      }
      return 0;
    };

    this.items = function () {
      // convert hash of items to an array for displaying purposes
      var itemsArray = [];
      for (var index in items) {
        itemsArray.push(items[index]);
      }
      return itemsArray;
    };

    this.totalPrice = function () {
      var total = 0;
      for ( var index in items) {
        total += items[index].quantity * items[index].price;
      }

      return total;
    };

  });

// items structure now looks like:
// items = {
//  123: {id: 123, name:'skirt',..} ,
//  456: {id: 456, name:'jeans',..}
// }
