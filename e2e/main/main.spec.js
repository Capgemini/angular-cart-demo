'use strict';

var config = browser.params;

describe('Main View', function() {
  var page;

  beforeEach(function() {
    browser.get(config.baseUrl + '/');
    page = require('./main.po');
  });

  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('Angular Cart Demo');
  });
});
