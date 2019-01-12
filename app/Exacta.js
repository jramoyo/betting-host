const roundTo = require('round-to');

const COMMISSION = .18;
module.exports = class {
  constructor() {
    this.total = 0;
    this.pool = {};
  }

  bet(first, second, stake) {
    if (isNaN(first) || isNaN(second) || isNaN(stake)) {
      throw new Error('Invalid parameters');
    }

    const selection = `${first}_${second}`;
    this.total += stake;
    this.pool[selection] = this.pool[selection] || [];
    this.pool[selection].push(stake);
  }

  result(first, second) {
    if (isNaN(first) || isNaN(second)) {
      throw new Error('Invalid parameters');
    }

    const selection = `${first}_${second}`;
    if (!this.pool[selection]) {
      return 0
    }

    const pot = this.total - (this.total * COMMISSION);
    const shares = this.pool[selection].reduce((total, stake) => total + stake, 0);
    return roundTo((pot / shares), 2);
  }
};
