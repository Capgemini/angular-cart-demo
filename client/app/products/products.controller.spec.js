'use strict';

describe('Controller: ProductsController', function () {

  // load the controller's module
  beforeEach(module('angularClothesShopApp'));
  beforeEach(module('stateMock'));
  beforeEach(module('socketMock'));

  var ProductsController;
  var scope;
  var $httpBackend;


  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/products')
      .respond(['T Shirt', 'Blue Cap', 'Denim Jeans', 'Shirt']);

    ProductsController = $controller('ProductsController', {
      $scope: scope
    });
  }));

  it('should attach a list of products to the controller', function() {
    $httpBackend.flush();
    expect(ProductsController.products.length).toBe(4);
  });
});
