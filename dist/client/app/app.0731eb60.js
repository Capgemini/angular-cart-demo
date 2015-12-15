"use strict";function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}angular.module("angularClothesShopApp",["angularClothesShopApp.constants","ngCookies","ngResource","ngSanitize","btford.socket-io","ui.router","ui.bootstrap"]).config(["$urlRouterProvider","$locationProvider",function(a,b){a.otherwise("/"),b.html5Mode(!0)}]),angular.module("angularClothesShopApp.util",[]),angular.module("angularClothesShopApp").factory("Modal",["$rootScope","$modal",function(a,b){function c(){var c=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],d=arguments.length<=1||void 0===arguments[1]?"modal-default":arguments[1],e=a.$new();return angular.extend(e,c),b.open({templateUrl:"components/modal/modal.html",windowClass:d,scope:e})}return{confirm:{"delete":function(){var a=arguments.length<=0||void 0===arguments[0]?angular.noop:arguments[0];return function(){var b,d=Array.prototype.slice.call(arguments),e=d.shift();b=c({modal:{dismissable:!0,title:"Confirm Delete",html:"<p>Are you sure you want to delete <strong>"+e+"</strong> ?</p>",buttons:[{classes:"btn-danger",text:"Delete",click:function(a){b.close(a)}},{classes:"btn-default",text:"Cancel",click:function(a){b.dismiss(a)}}]}},"modal-danger"),b.result.then(function(b){a.apply(b,d)})}}}}}]),angular.module("angularClothesShopApp").config(["$stateProvider",function(a){a.state("cart",{url:"/cart",templateUrl:"app/cart/cart.html",controller:"CartController",controllerAs:"cart"})}]),angular.module("angularClothesShopApp").service("cartService",function(){var a={};this.addItem=function(b,c,d,e){this.containsItem(b)?a[b].quantity+=1:a[b]={_id:b,name:c,price:d,quantity:e}},this.removeItem=function(b){return this.containsItem(b)?(a[b].quantity>1?a[b].quantity--:delete a[b],!0):!1},this.containsItem=function(b){return b in a},this.totalItems=function(){var b=0;for(var c in a)b+=a[c].quantity;return b},this.itemQuantity=function(b){return this.containsItem(b)?a[b].quantity:0},this.items=function(){var b=[];for(var c in a)b.push(a[c]);return b},this.totalPrice=function(){var b=0;for(var c in a)b+=a[c].quantity*a[c].price;return b}});var _createClass=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();!function(){var a=function(){function a(b,c,d,e){var f=this;_classCallCheck(this,a),this.cart=e,this.$http=b,this.products=[],b.get("/api/products").then(function(a){f.products=a.data,d.syncUpdates("product",f.products)}),c.$on("$destroy",function(){d.unsyncUpdates("product")})}return a.$inject=["$http","$scope","socket","cartService"],_createClass(a,[{key:"addToCart",value:function(a){a.quantity>this.cart.itemQuantity(a._id)&&this.cart.addItem(a._id,a.name,a.price,1)}},{key:"removeFromCart",value:function(a){this.cart.removeItem(a._id)}},{key:"productInCart",value:function(a){return this.cart.containsItem(a._id)}}]),a}();angular.module("angularClothesShopApp").controller("ProductsController",a)}(),angular.module("angularClothesShopApp").config(["$stateProvider",function(a){a.state("products",{url:"/",templateUrl:"app/products/products.html",controller:"ProductsController",controllerAs:"products"})}]);var _createClass=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();!function(){var a=function(){function a(b,c,d,e){_classCallCheck(this,a),this.cart=e,this.$http=b,this.items=this.cart.items()}return a.$inject=["$http","$scope","socket","cartService"],_createClass(a,[{key:"removeFromCart",value:function(a){this.cart.removeItem(a._id),this.items=this.cart.items()}},{key:"totalCartItems",value:function(){return this.cart.totalItems()}},{key:"totalCartPrice",value:function(){return this.cart.totalPrice()}}]),a}();angular.module("angularClothesShopApp").controller("CartController",a)}();var NavbarController=function a(){_classCallCheck(this,a),this.menu=[{title:"Products",state:"products"},{title:"Cart",state:"cart"}],this.isCollapsed=!0};angular.module("angularClothesShopApp").controller("NavbarController",NavbarController),angular.module("angularClothesShopApp").directive("navbar",function(){return{templateUrl:"components/navbar/navbar.html",restrict:"E",controller:"NavbarController",controllerAs:"nav"}}),angular.module("angularClothesShopApp").factory("socket",["socketFactory",function(a){var b=io("",{path:"/socket.io-client"}),c=a({ioSocket:b});return{socket:c,syncUpdates:function(a,b,d){d=d||angular.noop,c.on(a+":save",function(a){var c=_.find(b,{_id:a._id}),e=b.indexOf(c),f="created";c?(b.splice(e,1,a),f="updated"):b.push(a),d(f,a,b)}),c.on(a+":remove",function(a){var c="deleted";_.remove(b,{_id:a._id}),d(c,a,b)})},unsyncUpdates:function(a){c.removeAllListeners(a+":save"),c.removeAllListeners(a+":remove")}}}]),function(a,b){a.module("angularClothesShopApp.constants",[]).constant("appConfig",{userRoles:["guest","user","admin"]})}(angular),function(){function a(a){var b={safeCb:function(a){return angular.isFunction(a)?a:angular.noop},urlParse:function(a){var b=document.createElement("a");return b.href=a,b},isSameOrigin:function(c,d){return c=b.urlParse(c),d=d&&[].concat(d)||[],d=d.map(b.urlParse),d.push(a.location),d=d.filter(function(a){return c.hostname===a.hostname&&c.port===a.port&&c.protocol===a.protocol}),d.length>=1}};return b}a.$inject=["$window"],angular.module("angularClothesShopApp.util").factory("Util",a)}(),angular.module("angularClothesShopApp").run(["$templateCache",function(a){a.put("app/cart/cart.html",'<navbar></navbar><div class=container><!-- Empty cart --><div ng-show="cart.items < 1">Your cart is currently empty..</div><!-- Items in the shopping cart --><div class=cart-products-box><table class=cart-table><tr ng-hide="cart.items < 1"><th width=25%>Product</th><th width=25%>Quantity</th><th width=25%>Price</th><th width=25%>Action</th></tr><tr ng-repeat="item in cart.items"><td><a class=links href=/#/products/{{item._id}}>{{item.name}}</a></td><td class=cart-table-qty>{{item.quantity}}</td><td>price: {{item.price | currency:"£"}}</td><td><button ng-click=cart.removeFromCart(item) class="btn btn-primary">Remove from cart</button></td></tr></table><!-- total --><div ng-hide="cart.items < 1" id=totalPrice class=orange><b>Total: {{cart.totalCartPrice() | currency:"£"}}</b></div></div></div>'),a.put("app/products/products.html",'<navbar></navbar><div class=container><div class=row><form class="navbar-form navbar-left" role=search><div class=input-group><input class=form-control placeholder=Search name=search-text id=search-text ng-model=searchText><div class=input-group-btn><button class="btn btn-default" type=submit><i class="glyphicon glyphicon-search"></i></button></div></div></form></div><div class=row><div ng-repeat="product in products.products | orderBy: \'name\' | filter: searchText"><div class="col-xs-12 col-sm-6 col-md-4 product-box" ng-class="{\'outOfStock\': product.quantity == 0}"><div class=product-holder><a href=#/products/{{product._id}}><img class=front-icon ng-src="{{product.images[0]}}"><!-- Product info: name and price --><div class="product-details links row"><div class="col-xs-7 col-md-5"><p id=product-name class=pull-left>{{product.name}}</p></div><div class="col-xs-3 col-md-3"><p id=product-price class=pull-right>{{product.price | currency:"£"}}</p></div><div class="col-xs-3 col-md-3"><p id=add-button class="button-box pull-right"><button class="btn btn-warning ng-click-active" ng-click=products.addToCart(product) ng-disabled="product.quantity == 0" ng-show=!products.productInCart(product)>Add</button> <button class="btn btn-success ng-click-active" ng-click=products.addToCart(product) ng-disabled="product.quantity == 0" ng-show=products.productInCart(product)>Add</button></p></div></div></a></div><!-- end product-holder --></div><!-- end col --></div><!-- end ng-repeat --></div><!-- end row --></div>'),a.put("components/modal/modal.html",'<div class=modal-header><button ng-if=modal.dismissable type=button ng-click=$dismiss() class=close>&times;</button><h4 ng-if=modal.title ng-bind=modal.title class=modal-title></h4></div><div class=modal-body><p ng-if=modal.text ng-bind=modal.text></p><div ng-if=modal.html ng-bind-html=modal.html></div></div><div class=modal-footer><button ng-repeat="button in modal.buttons" ng-class=button.classes ng-click=button.click($event) ng-bind=button.text class=btn></button></div>'),a.put("components/navbar/navbar.html",'<div class="navbar navbar-default navbar-static-top" ng-controller=NavbarController><div class=container><div class=navbar-header><button class=navbar-toggle type=button ng-click="nav.isCollapsed = !nav.isCollapsed"><span class=sr-only>Toggle navigation</span> <span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></button> <a href="/" class=navbar-brand>angular-clothes-shop</a></div><div collapse=nav.isCollapsed class="navbar-collapse collapse" id=navbar-main><ul class="nav navbar-nav"><li ng-repeat="item in nav.menu" ui-sref-active=active><a ui-sref={{item.state}}>{{item.title}}</a></li></ul></div></div></div>')}]);