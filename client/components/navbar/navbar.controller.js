'use strict';

class NavbarController {
  //start-non-standard
  menu = [
    {
      'title': 'Products',
      'state': 'products'
    },
    {
      'title': 'Cart',
      'state': 'cart'
    }
  ];

  isCollapsed = true;
  //end-non-standard

  constructor() {
  }
}

angular.module('angularClothesShopApp')
  .controller('NavbarController', NavbarController);
