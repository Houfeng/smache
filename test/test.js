var Cache = require('../');
var assert = require('assert');

var cache = null;

beforeEach(function () {
  cache = new Cache({
    max: 3,
    ttl: 30
  });
});

describe('Cache', function () {

  it('set & get', function () {
    cache.set(1, 1);
    assert.equal(cache.get(1), 1);
  });

  it('remove', function () {
    cache.set(1, 1);
    cache.remove(1);
    assert.equal(cache.get(1), null);
  });

  it('clear', function () {
    cache.set(1, 1);
    cache.clear(1);
    assert.equal(cache.get(1), null);
  });

  it('max', function (done) {
    cache.set(1, 1);
    cache.set(2, 2);
    cache.set(3, 3);
    cache.set(4, 4);
    assert.equal(cache.get(1), null);
    setTimeout(function () {
      cache.get(2);
      cache.set(5, 5);
      assert.equal(cache.get(2), 2);
      assert.equal(cache.get(3), null);
      done();
    }, 10);
  });

  it('ttl#1', function (done) {
    cache.set(1, 1);
    setTimeout(function () {
      assert.equal(cache.get(1), null);
      done();
    }, 100);
  });

  it('ttl#2', function (done) {
    cache.set(1, 1, 300);
    setTimeout(function () {
      assert.equal(cache.get(1), 1);
      done();
    }, 100);
  });

});
