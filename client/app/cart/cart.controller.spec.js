'use strict';

describe('Controller: CartController', function () {

  // load the controller's module
  beforeEach(module('angularClothesShopApp'));
  beforeEach(module('stateMock'));
  beforeEach(module('socketMock'));

  var CartController, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CartController = $controller('CartController', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
