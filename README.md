# betting-hosts

## Getting Started

Checkout the project from GitHub:
```
git clone git@github.com:jramoyo/betting-host.git
cd betting-host
```

Ensure that the correct version of Node.js is loaded (only if `nvm` is available):
```
nvm use
```

Download project dependencies:
```
npm install
```

Run the application
```
npm start
```

### Commands

**`Bet`**

The format of a bet is `Bet:<product>:<selections>:<stake>`, where:
* `<product>` is one of `W`, `P`, `E`
* `<selection>` is either a single runner number (e.g. 4) for Win and Place, or two runner numbers (e.g. 4,3) for Exacta
* `<stake>` is an amount in whole dollars (e.g. 35)

**`Results`**

The format of the results is `Result:<first>:<second>:<third>`.
For example, `Result:5:3:8` represents a race where horse 5 finished first, horse 3 finished second and horse 8 finished third.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app

### `npm test`

Runs the tests
