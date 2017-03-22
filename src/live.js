import Gun from 'gun/gun'

Gun.chain.live = function (cb, opt) {
  return this.on(function (val, field) {
    if (val) {
      delete val._;
    }
    cb.call(this, val, field);
  }, opt);
}