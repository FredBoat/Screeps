var _ = require('lodash');

Creep.prototype.moveToCheap = function (x, y, opts) {
    return this.cheaperMove(x, y, 10, opts);
};

Creep.prototype.moveToCheaper = function (x, y, opts) {
    return this.cheaperMove(x, y, 25, opts);
};

Creep.prototype.moveToCheapest = function (x, y, opts) {
    return this.cheaperMove(x, y, 50, opts);
};


Creep.prototype.cheaperMove = function (x, y, cheap, opts) {
    console.log("got em ", this)
    var newOpts = _.merge({}, opts, {reusePath: cheap});
    console.log("newOpts=", JSON.stringify(newOpts));
    return this.moveTo(x, y, newOpts);
}
