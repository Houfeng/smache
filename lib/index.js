/**
 * Cache 模块
 **/
function Cache(options) {
  options = options || {};
  this.options = options;
  this._cache = Object.create(null);
  this._index = 0;
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
    fn(this._cache[key]);
  }
};

/**
 * 检查并清理缓存项
 **/
Cache.prototype._check = function () {
  if (this.count() < this.options.max) return;
  var oldItem = {
    at: Date.now() * 2,
    sn: this._index * 2
  };
  this._each(function (item) {
    if (item.at > oldItem.at) return;
    if (item.at == oldItem.at && item.sn > oldItem.sn) return;
    oldItem = item;
  });
  //console.log(oldItem);
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
  var ttl = this._isNull(item.ttl) ? this.options.ttl : item.ttl;
  if (!this._isNull(ttl) && Date.now() - item.at > ttl) {
    this.remove(key);
    return;
  }
  item.at = Date.now();
  return item.value;
};

/**
 * 设置缓存项
 **/
Cache.prototype.set = function (key, value, ttl) {
  if (this._isNull(key)) return this;
  this._check();
  key = key.toString();
  this._cache[key] = {
    key: key,
    sn: this._index++,
    at: Date.now(),
    ttl: ttl,
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
  this._index = 0;
};

module.exports = Cache;