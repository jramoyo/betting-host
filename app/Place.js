const roundTo = require('round-to');

const COMMISSION = .12;
module.exports = class {
  constructor() {
    this.total = 0;
    this.pool = {};
  }

  bet(selection, stake) {
    if (isNaN(selection) || isNaN(stake)) {
      throw new Error('Invalid parameters');
    }

    this.total += stake;
    this.pool[selection] = this.pool[selection] || [];
    this.pool[selection].push(stake);
  }

  result(selection) {
    if (isNaN(selection)) {
      throw new Error('Invalid parameters');
    }

    if (!this.pool[selection]) {
      return 0
    }

    const pot = (this.total - (this.total * COMMISSION)) / 3;
    const shares = this.pool[selection].reduce((total, stake) => total + stake, 0);
    return roundTo((pot / shares), 2);
  }
};
