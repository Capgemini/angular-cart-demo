// Protractor configuration
// https://github.com/angular/protractor/blob/master/referenceConf.js

'use strict';

var config = {
  // The timeout for each script run on the browser. This should be longer
  // than the maximum time your application needs to stabilize between tasks.
  allScriptsTimeout: 110000,

  // A base URL for your application under test. Calls to protractor.get()
  // with relative paths will be prepended with this.
  baseUrl: 'http://localhost:' + (process.env.PORT || '9000'),

  // Credientials for Saucelabs
  sauceUser: process.env.SAUCE_USERNAME,

  sauceKey: process.env.SAUCE_ACCESS_KEY,

  // list of files / patterns to load in the browser
  specs: [
    'e2e/**/*.spec.js'
  ],

  // Patterns to exclude.
  exclude: [],

  // ----- Capabilities to be passed to the webdriver instance ----
  //
  // For a full list of available capabilities, see
  // https://code.google.com/p/selenium/wiki/DesiredCapabilities
  // and
  // https://code.google.com/p/selenium/source/browse/javascript/webdriver/capabilities.js
  capabilities: {
    'browserName': 'chrome',
    'name': 'Fullstack E2E',
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    'build': process.env.TRAVIS_BUILD_NUMBER
  },

  // ----- The test framework -----
  //
  // Jasmine and Cucumber are fully supported as a test and assertion framework.
  // Mocha has limited beta support. You will need to include your own
  // assertion framework if working with mocha.
  framework: 'jasmine2',

  // ----- Options to be passed to minijasminenode -----
  //
  // See the full list at https://github.com/jasmine/jasmine-npm
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000,
    print: function() {}  // for jasmine-spec-reporter
  },

  // Prepare environment for tests
  params: {
    serverConfig: require('./server/config/environment')
  },

  onPrepare: function() {
    require('babel-core/register');
    var SpecReporter = require('jasmine-spec-reporter');
    // add jasmine spec reporter
    jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: true}));

    var serverConfig = config.params.serverConfig;

    // Setup mongo for tests
    var mongoose = require('mongoose');
    mongoose.connect(serverConfig.mongo.uri, serverConfig.mongo.options); // Connect to database
  }
};

config.params.baseUrl = config.baseUrl;
exports.config = config;
