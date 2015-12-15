/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/products              ->  index
 * POST    /api/products              ->  create
 * GET     /api/products/:id          ->  show
 * PUT     /api/products/:id          ->  update
 * DELETE  /api/products/:id          ->  destroy
 */

'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.index = index;
exports.show = show;
exports.create = create;
exports.update = update;
exports.destroy = destroy;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var Product = require('./product.model');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function (entity) {
    var updated = _lodash2['default'].merge(entity, updates);
    return updated.saveAsync().spread(function (updated) {
      return updated;
    });
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.removeAsync().then(function () {
        res.status(204).end();
      });
    }
  };
}

// Gets a list of Products

function index(req, res) {
  Product.findAsync().then(responseWithResult(res))['catch'](handleError(res));
}

// Gets a single Product from the DB

function show(req, res) {
  Product.findByIdAsync(req.params.id).then(handleEntityNotFound(res)).then(responseWithResult(res))['catch'](handleError(res));
}

// Creates a new Product in the DB

function create(req, res) {
  Product.createAsync(req.body).then(responseWithResult(res, 201))['catch'](handleError(res));
}

// Updates an existing Product in the DB

function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Product.findByIdAsync(req.params.id).then(handleEntityNotFound(res)).then(saveUpdates(req.body)).then(responseWithResult(res))['catch'](handleError(res));
}

// Deletes a Product from the DB

function destroy(req, res) {
  Product.findByIdAsync(req.params.id).then(handleEntityNotFound(res)).then(removeEntity(res))['catch'](handleError(res));
}
//# sourceMappingURL=product.controller.js.map
