const chai = require('chai');
const Win = require('../app/Win');

const expect = chai.expect;

describe('Win', () => {

  it('calculates the dividends with 2 decimal places', () => {
    const win = new Win();

    win.bet(1, 3);
    win.bet(2, 4);
    win.bet(3, 5);
    win.bet(4, 5);
    win.bet(1, 16);
    win.bet(2, 8);
    win.bet(3, 22);
    win.bet(4, 57);
    win.bet(1, 42);
    win.bet(2, 98);
    win.bet(3, 63);
    win.bet(4, 15);

    expect(win.result(2)).to.equal(2.61);

  });

});