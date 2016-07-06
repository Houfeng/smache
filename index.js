/**
 * Cache 模块
 **/
function Cache(options) {
  options = options || {};
  this.options = options;
  this._cache = Object.create(null);
};

/**
 * 是否为 null 或 undefined
 **/
Cache.prototype._isNull = function (value) {
  return value === null || value === undefined;
};

/**
 * 遍历所有缓存项
 **/
Cache.prototype._each = function (fn) {
  for (var key in this._cache) {
    fn(map[key]);
  }
};

/**
 * 检查并清理缓存项
 **/
Cache.prototype._check = function () {
  if (this.count() < this.options.max) return;
  var oldItem = {
    at: Date.now() * 2,
    sn: Number.MAX_VALUE
  };
  this._each(function (item) {
    if (item.at > oldItem.at) return;
    if (item.at == oldItem.at && item.sn > oldItem.sn) return;
    delItem = item;
  });
  this.remove(oldItem.key);
};

/**
 * 统计缓存项
 **/
Cache.prototype.count = function () {
  return Object.keys(this._cache).length
};

/**
 * 获取缓存项
 **/
Cache.prototype.get = function (key) {
  if (this._isNull(key)) return;
  key = key.toString();
  var item = this._cache[key];
  if (this._isNull(item)) return;
  item.at = Date.now();
  return item.value;
};

/**
 * 设置缓存项
 **/
Cache.prototype.set = function (key, value) {
  if (this._isNull(key)) return this;
  this._check();
  key = key.toString();
  this._cache[key] = {
    sn: this.count(),
    at: Date.now(),
    value: value
  };
  return this;
};

/**
 * 移除缓存项
 **/
Cache.prototype.remove = function (key) {
  if (this._isNull(key)) return this;
  key = key.toString();
  delete this._cache[key];
  return this;
};

/**
 * 清理缓存项
 **/
Cache.prototype.clear = function () {
  this._cache = Object.create(null);
};

module.exports = Cache;