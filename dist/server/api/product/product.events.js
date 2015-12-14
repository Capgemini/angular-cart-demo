/**
 * Product model events
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _events = require('events');

var Product = require('./product.model');
var ProductEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
ProductEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Product.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    ProductEvents.emit(event + ':' + doc._id, doc);
    ProductEvents.emit(event, doc);
  };
}

exports['default'] = ProductEvents;
module.exports = exports['default'];
//# sourceMappingURL=product.events.js.map
