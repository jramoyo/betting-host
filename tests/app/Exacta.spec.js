const chai = require('chai');
const Exacta = require('../../app/Exacta');

const expect = chai.expect;

describe('Exacta', () => {

  let exacta;

  beforeEach(() => {
    exacta = new Exacta()
  })

  it('calculates the dividends with 2 decimal places', () => {

    exacta.bet(1, 2, 13);
    exacta.bet(2, 3, 98);
    exacta.bet(1, 3, 82);
    exacta.bet(3, 2, 27);
    exacta.bet(1, 2, 5);
    exacta.bet(2, 3, 61);
    exacta.bet(1, 3, 28);
    exacta.bet(3, 2, 25);
    exacta.bet(1, 2, 81);
    exacta.bet(2, 3, 47);
    exacta.bet(1, 3, 93);
    exacta.bet(3, 2, 51);

    expect(exacta.result(2, 3)).to.equal(2.43);

  });

  it('calculates a zero dividend if there are no bets on the winning stakes', () => {
    exacta.bet(1, 2, 10);
    expect(exacta.result(2, 3)).to.equal(0);
  });

  it('throws an exception if the bet parameters are not numbers', () => {
    expect(() => exacta.bet('a', 1, 2)).to.throw(Error);
    expect(() => exacta.bet(1, 'a', 2)).to.throw(Error);
    expect(() => exacta.bet(1, 2, 'a')).to.throw(Error);
  });

  it('throws an exception if the result parameters are not numbers', () => {
    expect(() => exacta.result('a', 1)).to.throw(Error);
    expect(() => exacta.result(1, 'a')).to.throw(Error);
  });

});
