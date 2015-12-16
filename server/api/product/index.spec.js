'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var productControllerStub = {
  index: 'productController.index',
  show: 'productController.show',
  create: 'productController.create',
  update: 'productController.update',
  destroy: 'productController.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var productIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './product.controller': productControllerStub
});

describe('Product API Router:', function() {

  it('should return an express router instance', function() {
    productIndex.should.equal(routerStub);
  });

  describe('GET /api/products', function() {

    it('should route to product.controller.index', function() {
      routerStub.get
        .withArgs('/', 'productController.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/products/:id', function() {

    it('should route to product.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'productController.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/products', function() {

    it('should route to product.controller.create', function() {
      routerStub.post
        .withArgs('/', 'productController.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/products/:id', function() {

    it('should route to product.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'productController.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/products/:id', function() {

    it('should route to product.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'productController.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/products/:id', function() {

    it('should route to product.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'productController.destroy')
        .should.have.been.calledOnce;
    });

  });

});
