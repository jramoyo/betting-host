module.exports = class {

  constructor(win, place, exacta) {
    this.win = win;
    this.place = place;
    this.exacta = exacta;
  }

  _betTokensValid(tokens) {
    if (tokens.length < 3) {
      return false;
    }
    if (tokens.some(token => token.length < 1)) {
      return false;
    }

    return true;
  }

  _betWin(tokens) {
    const selection = Number(tokens[1]);
    const stake = Number(tokens[2]);
    this.win.bet(selection, stake);
  }

  _betPlace(tokens) {
    const selection = Number(tokens[1]);
    const stake = Number(tokens[2]);
    this.place.bet(selection, stake);
  }

  _betExacta(tokens) {
    const first = Number(tokens[1].split(',')[0]);
    const second = Number(tokens[1].split(',')[1]);
    const stake = Number(tokens[2]);
    this.exacta.bet(first, second, stake);
  }

  bet(command) {
    const tokens = command.split(':');
    if (!this._betTokensValid(tokens)) {
      throw new Error('Invalid bet parameters');
    }

    switch (tokens[0]) {
      case 'W':
        this._betWin(tokens);
        break;
      case 'P':
        this._betPlace(tokens);
        break;
      case 'E':
        this._betExacta(tokens);
        break;
      default:
        throw new Error('Unknown product');
    }
  }

  _resultTokensValid(tokens) {
    if (tokens.length < 2) {
      return false;
    }
    if (tokens.some(token => token.length < 1)) {
      return false;
    }

    return true;
  }

  result(command) {
    const tokens = command.split(':');
    if (!this._resultTokensValid(tokens)) {
      throw new Error('Invalid result parameters');
    }

    const first = Number(tokens[0]);
    const second = Number(tokens[1]);
    const third = Number(tokens[2]);

    const winResult = this.win.result(first);
    const placeResult1 = this.place.result(first);
    const placeResult2 = this.place.result(second);
    const placeResult3 = this.place.result(third);
    const exactaResult = this.exacta.result(first, second);

    const report = `Win:${first}:$${winResult}
Place:${first}:$${placeResult1}
Place:${second}:$${placeResult2}
Place:${third}:$${placeResult3}
Exacta:${first},${second}:$${exactaResult}`;

    return report;
  }

};
