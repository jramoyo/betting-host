const chai = require('chai');
const Win = require('../../app/Win');

const expect = chai.expect;

describe('Win', () => {

  let win;

  beforeEach(() => {
    win = new Win()
  })

  it('calculates the dividends with 2 decimal places', () => {

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

  it('calculates a zero dividend if there are no bets on the winning stake', () => {
    win.bet(1, 10);
    expect(win.result(2)).to.equal(0);
  });

  it('throws an exception if the bet parameters are not numbers', () => {
    expect(() => place.bet('a', 1)).to.throw(Error);
    expect(() => place.bet(1, 'a')).to.throw(Error);
  });

  it('throws an exception if the result parameters are not numbers', () => {
    expect(() => place.result('a')).to.throw(Error);
  });

});
