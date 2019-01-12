const roundTo = require('round-to');

const COMMISSION = .15;
module.exports = class {
  constructor() {
    this.total = 0;
    this.pool = {};
  }

  bet(selection, stake) {
    this.total += stake;
    this.pool[selection] = this.pool[selection] || [];
    this.pool[selection].push(stake);
  }

  result(selection) {
    const pot = this.total - (this.total * COMMISSION);
    const shares = this.pool[selection].reduce((total, stake) => total + stake);
    return roundTo((pot / shares), 2);
  }
};