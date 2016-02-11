'use strict';

var config = browser.params;

describe('Main View', function() {
  var page;

  beforeEach(function() {

    browser.get(config.baseUrl + '/');
    browser.refresh();
  });

  it('should have a title', function() {

    expect(browser.getTitle()).toEqual('Angular Cart Demo');
  });
});
