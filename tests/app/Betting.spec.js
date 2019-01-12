const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

const Win = require('../../app/Win');
const Place = require('../../app/Place');
const Exacta = require('../../app/Exacta');
const Betting = require('../../app/Betting');

describe('Betting', () => {

  let win = new Win();
  let place = new Place();
  let exacta = new Exacta();

  let betting;

  beforeEach(() => {
    win = new Win();
    place = new Place();
    exacta = new Exacta();

    betting = new Betting(win, place, exacta);
  });

  describe('#bet', () => {

    it('places a bet on the correct product', () => {
      const winSpy = sinon.spy(win, 'bet');
      const placeSpy = sinon.spy(place, 'bet');
      const exactaSpy = sinon.spy(exacta, 'bet');

      betting.bet('W:1:5');
      betting.bet('P:2:6');
      betting.bet('E:3,4:7');

      expect(winSpy.calledWith(1, 5)).to.equal(true);
      expect(placeSpy.calledWith(2, 6)).to.equal(true);
      expect(exactaSpy.calledWith(3, 4, 7)).to.equal(true);
    });

    it('throws an error if the product is incorrect', () => {
      expect(() => betting.bet('X:1:2')).to.throw(Error);
    });

    it('throws an error if the bet format is invalid', () => {
      expect(() => betting.bet('W:1')).to.throw(Error);
      expect(() => betting.bet('P:2')).to.throw(Error);
      expect(() => betting.bet('E:3')).to.throw(Error);

      expect(() => betting.bet('W:1:')).to.throw(Error);
      expect(() => betting.bet('P:2:')).to.throw(Error);
      expect(() => betting.bet('E:3:')).to.throw(Error);

      expect(() => betting.bet('W:')).to.throw(Error);
      expect(() => betting.bet('P:')).to.throw(Error);
      expect(() => betting.bet('E:')).to.throw(Error);

      expect(() => betting.bet('W::')).to.throw(Error);
      expect(() => betting.bet('P::')).to.throw(Error);
      expect(() => betting.bet('E::')).to.throw(Error);

      expect(() => betting.bet('W')).to.throw(Error);
      expect(() => betting.bet('P')).to.throw(Error);
      expect(() => betting.bet('E')).to.throw(Error);

      expect(() => betting.bet('')).to.throw(Error);
    });

  });

  describe('#result', () => {

    it('returns a report of the product results', () => {
      const placeStub = sinon.stub(place, 'result');
      placeStub.withArgs(2).returns(1.06);
      placeStub.withArgs(3).returns(1.27);
      placeStub.withArgs(1).returns(2.13);
      sinon.stub(win, 'result').withArgs(2).returns(2.61);
      sinon.stub(exacta, 'result').withArgs(2, 3).returns(2.43);

      expect(betting.result('2:3:1')).to.equal(
        `Win:2:$2.61
Place:2:$1.06
Place:3:$1.27
Place:1:$2.13
Exacta:2,3:$2.43`);
    });

    it('throws an error if the result format is invalid', () => {
      expect(() => betting.result('1:2:')).to.throw(Error);
      expect(() => betting.result('1::')).to.throw(Error);
      expect(() => betting.result('1:')).to.throw(Error);
      expect(() => betting.result('')).to.throw(Error);
    });

  });

});
