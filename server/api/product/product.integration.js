'use strict';

var app = require('../..');

import request from 'supertest';

var newProduct;

describe('Product API:', function() {

  describe('GET /api/products', function() {
    var products;

    beforeEach(function(done) {
      request(app)
        .get('/api/products')
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          products = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      products.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/products', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/products')
        .send({
          name: 'New Product',
          description: 'This is the brand new product!!!',
          price: 99,
          quantity: 2
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newProduct = res.body;
          done();
        });
    });

    it('should respond with the newly created product', function() {
      newProduct.name.should.equal('New Product');
      newProduct.description.should.equal('This is the brand new product!!!');
      newProduct.price.should.equal(99);
      newProduct.quantity.should.equal(2);
    });

  });

  describe('GET /api/products/:id', function() {
    var product;

    beforeEach(function(done) {
      request(app)
        .get('/api/products/' + newProduct._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          product = res.body;
          done();
        });
    });

    afterEach(function() {
      product = {};
    });

    it('should respond with the requested product', function() {
      product.name.should.equal('New Product');
      product.description.should.equal('This is the brand new product!!!');
      product.price.should.equal(99);
      product.quantity.should.equal(2);
    });

  });

  describe('PUT /api/products/:id', function() {
    var updatedProduct;

    beforeEach(function(done) {
      request(app)
        .put('/api/products/' + newProduct._id)
        .send({
          name: 'Updated Product',
          description: 'This is the updated product!!!',
          quantity: 1,
          price: 50,
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedProduct = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedProduct = {};
    });

    it('should respond with the updated product', function() {
      updatedProduct.name.should.equal('Updated Product');
      updatedProduct.description.should.equal('This is the updated product!!!');
      updatedProduct.price.should.equal(50);
      updatedProduct.quantity.should.equal(1);
    });

  });

  describe('DELETE /api/products/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/products/' + newProduct._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when product does not exist', function(done) {
      request(app)
        .delete('/api/products/' + newProduct._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

  describe('GET /bleh', function() {
    it('should respond with index.html', function() {
      request(app)
        .get('/bleh')
        .expect(200)
        .expect('Content-Type', /text\/html/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
