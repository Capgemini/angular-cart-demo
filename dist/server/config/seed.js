/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _apiProductProductModel = require('../api/product/product.model');

var _apiProductProductModel2 = _interopRequireDefault(_apiProductProductModel);

_apiProductProductModel2['default'].find({}).removeAsync().then(function () {
  _apiProductProductModel2['default'].create({
    name: 'Cream dress',
    description: 'Semi-sheer woven cream tie smock dress',
    price: 30,
    "images": ["assets/images/cream-dress.jpg"],
    "quantity": 4
  }, {
    name: 'Kimono Jacket',
    description: 'Denim kimono jacket with open front design',
    price: 55,
    "images": ["assets/images/kimono-jacket.jpg"],
    "quantity": 10
  }, {
    name: 'Gold dress',
    description: 'Textured dress with military gold button detail',
    price: 66,
    "images": ["assets/images/gold-dress.jpg"],
    "quantity": 8
  }, {
    name: 'Split front T-Shirt',
    description: 'Cotton jersey crew neckline T shirt',
    price: 30,
    "images": ["assets/images/white-t-shirt.jpg"],
    "quantity": 5
  }, {
    name: 'Green Sweatshirt',
    description: 'Loop-back sweatshirt with embroidery in washed green',
    price: 65,
    "images": ["assets/images/green-sweatshirt.jpg"],
    "quantity": 2
  }, {
    name: 'Knitted Cape',
    description: 'Chunky Knitted cape in black rib',
    price: 60,
    "images": ["assets/images/black-cape.jpg"],
    "quantity": 7
  }, {
    name: 'Vintage Tie',
    description: 'Reclaimed vintage floral bow tie',
    price: 23,
    "images": ["assets/images/vintage-tie.jpg"],
    "quantity": 8
  }, {
    name: 'Blue cap',
    description: 'Snapback cap with crocodile effect and contrast peak',
    price: 20,
    "images": ["assets/images/blue-cap.jpg"],
    "quantity": 9
  });
});
//# sourceMappingURL=seed.js.map
