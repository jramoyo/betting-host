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
    if (!this.pool[selection]) {
      return 0
    }

    const pot = this.total - (this.total * COMMISSION);
    const shares = this.pool[selection].reduce((total, stake) => total + stake, 0);
    return roundTo((pot / shares), 2);
  }
};