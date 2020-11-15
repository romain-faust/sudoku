# Sudoku

This script is intended to solve standard [Sudokus](https://en.wikipedia.org/wiki/Sudoku)
(9x9 grid) regardless of their difficulty level.

## Prerequisites

- [Node.js](https://nodejs.org/en/download/)

## Usage

```js
const sudoku = require('./path-to-the-sudoku-script');

const grid = [
    [7, 0, 0, 0, 0, 0, 0, 0, 0],
    [2, 4, 9, 0, 0, 0, 0, 8, 0],
    [0, 5, 0, 0, 0, 0, 3, 0, 0],
    [3, 0, 0, 0, 5, 0, 0, 0, 0],
    [0, 0, 0, 0, 9, 6, 0, 0, 0],
    [0, 0, 6, 0, 8, 4, 7, 0, 0],
    [0, 0, 0, 6, 7, 0, 5, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 4, 9],
    [0, 0, 0, 0, 4, 9, 0, 2, 0],
];
const solvedGrid = sudoku(grid);
```

## Tests

```bash
node sudoku.test.js
```

## License

[MIT](./license)
