'use strict';

describe('Service: cartService', function () {

  // load the service's module
  beforeEach(module('angularClothesShopApp'));

  var mockItems = [
    { _id: 1234, name: 'One', price: 10, quantity: 1 },
    { _id: 12345, name: 'Two', price: 20, quantity: 2 }
  ];

  var INVALID_ID = 98765;

  // instantiate service
  var cartService;

  beforeEach(inject(function (_cartService_) {
    cartService = _cartService_;
  }));

  // tests for items
  it('has no items when it is empty', function () {
    expect(cartService.items()).toEqual([]);
  });

  it('stores items correctly', function () {
    mockItems.forEach(function(item) {
      cartService.addItem(item._id, item.name, item.price, item.quantity);
    });

    expect(cartService.items()).toEqual(mockItems);
    expect(cartService.items().length).toEqual(mockItems.length);
  });


  it('can increment an item\'s quantity', function () {
    cartService.addItem(mockItems[0]._id, mockItems[0].name, mockItems[0].price, mockItems[0].quantity);
    cartService.addItem(mockItems[0]._id, mockItems[0].name, mockItems[0].price, mockItems[0].quantity);
    expect(cartService.items()[0].quantity).toEqual(2);
  });

  // tests for removing items
  it('can have items removed from it', function () {
    cartService.addItem(mockItems[0]._id, mockItems[0].name, mockItems[0].price, mockItems[0].quantity);
    cartService.removeItem(mockItems[0]._id);
    expect(cartService.items().length).toEqual(0);
  });

  it('can not remove items if cart empty',function () {
    expect(cartService.removeItem(INVALID_ID)).toBe(false);
  });

  it('only removes specified amount of items', function () {
    cartService.addItem(mockItems[0]._id, mockItems[0].name, mockItems[0].price, mockItems[0].quantity);
    cartService.addItem(mockItems[0]._id, mockItems[0].name, mockItems[0].price, mockItems[0].quantity);
    cartService.removeItem(mockItems[0]._id);
    expect(cartService.items()[0].quantity).toEqual(1);
  });

  it('can not remove an item that does not exist from the cart', function(){
    cartService.addItem(mockItems[0]._id, mockItems[0].name, mockItems[0].price, mockItems[0].quantity);
    expect(cartService.removeItem(INVALID_ID)).toBe(false);
  });

  // testing for item total
  it('is empty by default', function () {
    expect(cartService.totalItems()).toBe(0);
  });

  it('returns correct item total when adding more items', function () {
    mockItems.forEach(function(item) {
      cartService.addItem(item._id, item.name, item.price, item.quantity);
    });
    expect(cartService.totalItems()).toBe(3);
  });

  // tests for individual product quantity
  it('has qty 0 for a product that is not in cart', function () {
    expect(cartService.itemQuantity(INVALID_ID)).toBe(0);
  });

  it('knows total for each item in cart - product in cart', function () {
    cartService.addItem(mockItems[0]._id, mockItems[0].name, mockItems[0].price, mockItems[0].quantity);
    expect(cartService.itemQuantity(mockItems[0]._id)).toBe(1);
  });

  // tests for total price
  it('has total price zero when it does not have any items in it', function () {
    expect(cartService.totalPrice()).toEqual(0);
  });

  it('can calculate the total price of all items', function () {
    mockItems.forEach(function(item) {
      cartService.addItem(item._id, item.name, item.price, item.quantity);
    });

    var totalPrice = (mockItems[0].price * mockItems[0].quantity) + (mockItems[1].price * mockItems[1].quantity);
    expect(cartService.totalPrice()).toEqual(totalPrice);
  });

});
