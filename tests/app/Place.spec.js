const chai = require('chai');
const Place = require('../../app/Place');

const expect = chai.expect;

describe('Place', () => {

  let place;

  beforeEach(() => {
    place = new Place()
  })

  it('calculates the dividends with 2 decimal places', () => {

    place.bet(1, 31);
    place.bet(2, 89);
    place.bet(3, 28);
    place.bet(4, 72);
    place.bet(1, 40);
    place.bet(2, 16);
    place.bet(3, 82);
    place.bet(4, 52);
    place.bet(1, 18);
    place.bet(2, 74);
    place.bet(3, 39);
    place.bet(4, 105);

    expect(place.result(2)).to.equal(1.06);
    expect(place.result(3)).to.equal(1.27);
    expect(place.result(1)).to.equal(2.13);

  });

  it('calculates a zero dividend if there are no bets on the winning stake', () => {
    place.bet(1, 10);
    expect(place.result(2)).to.equal(0);
  });

  it('throws an exception if the bet parameters are not numbers', () => {
    expect(() => place.bet('a', 1)).to.throw(Error);
    expect(() => place.bet(1, 'a')).to.throw(Error);
  });

  it('throws an exception if the result parameters are not numbers', () => {
    expect(() => place.result('a')).to.throw(Error);
  });

});
