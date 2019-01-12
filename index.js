const readline = require('readline');

const Win = require('./app/Win');
const Place = require('./app/Place');
const Exacta = require('./app/Exacta');

const Betting = require('./app/Betting');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const betting = new Betting(
  new Win(),
  new Place(),
  new Exacta()
);

const showCommands = () => {
  console.log(`
Valid commands:
> Bet:<product>:<selections>:<stake>
> Result:<first>:<second>:<third>
`);
}

const showError = (err) => {
  console.error(`${err.message}`);
}

const handleCommand = (line) => {
  const _extractParams = (line) => line.substring(line.indexOf(':') + 1, line.length);

  if (line.startsWith('Bet:')) {
    betting.bet(_extractParams(line));
  }

  else if (line.startsWith('Result:')) {
    const result = betting.result(_extractParams(line));
    console.log(`\n${result}\n`);
  }

  else {
    throw new Error('Invalid command');
  }
}

showCommands();

rl.on('line', (line) => {
  try {
    handleCommand(line);
  } catch (err) {
    showError(err);
  }
});
