'use strict';

describe('Controller: DetailController', function () {

  // load the controller's module
  beforeEach(module('angularClothesShopApp'));
  beforeEach(module('stateMock'));
  beforeEach(module('socketMock'));

  var DetailController, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DetailController = $controller('DetailController', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
