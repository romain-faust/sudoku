const GRID_SIZE = 9;
const SQUARE_SIZE = Math.sqrt(GRID_SIZE);

/**
 * Expects a 2D array (blank cells should be replaced with `0`) and returns
 * ***another*** 2D array containing the results.
 */
module.exports = function sudoku(grid) {
	if (!isValidGrid(grid)) {
		throw new Error(`Expected a ${GRID_SIZE}x${GRID_SIZE} grid`);
	}

	const workGrid = buildWorkGrid(grid);
	if (!backtrack(workGrid)) {
		throw new Error(`This sudoku cannot be solved`);
	}

	return workGrid.map((line) => line.map((cell) => cell.value));
};

function backtrack(grid, y = 0, x = 0, n = 1) {
	if (n > GRID_SIZE) {
		return false;
	} else if (y >= GRID_SIZE) {
		return true;
	} else if (x >= GRID_SIZE) {
		return backtrack(grid, y + 1);
	} else if (grid[y][x].locked) {
		return backtrack(grid, y, x + 1);
	} else if (!numberIsValid(grid, y, x, n)) {
		return backtrack(grid, y, x, n + 1);
	}

	grid[y][x].value = n;

	if (!backtrack(grid, y, x + 1)) {
		grid[y][x].value = 0;
		return backtrack(grid, y, x, n + 1);
	}

	return true;
}

function buildWorkGrid(grid) {
	return grid.map((line) =>
		line.map((cell) => ({ locked: cell !== 0, value: cell })),
	);
}

function extractSquare(grid, y, x) {
	const squareY = Math.floor(y / SQUARE_SIZE) * SQUARE_SIZE;
	const squareX = Math.floor(x / SQUARE_SIZE) * SQUARE_SIZE;

	return grid
		.slice(squareY, squareY + SQUARE_SIZE)
		.map((line) => line.slice(squareX, squareX + SQUARE_SIZE));
}

function isValidGrid(grid) {
	return (
		grid.length === GRID_SIZE &&
		grid.every((line) => line.length === GRID_SIZE) &&
		grid.every((line) => line.every((cell) => cell >= 0 && cell <= 9))
	);
}

function numberIsInLine(grid, y, x, n) {
	if (x >= grid[y].length) {
		return false;
	} else if (grid[y][x].value === n) {
		return true;
	}
	return numberIsInLine(grid, y, x + 1, n);
}

function numberIsInRow(grid, y, x, n) {
	if (y >= grid.length) {
		return false;
	} else if (grid[y][x].value === n) {
		return true;
	}
	return numberIsInRow(grid, y + 1, x, n);
}

function numberIsInSquare(grid, y, x, n) {
	if (y >= grid.length) {
		return false;
	} else if (x >= grid[y].length) {
		return numberIsInSquare(grid, y + 1, 0, n);
	} else if (grid[y][x].value === n) {
		return true;
	}
	return numberIsInSquare(grid, y, x + 1, n);
}

function numberIsValid(grid, y, x, n) {
	return (
		!numberIsInRow(grid, 0, x, n) &&
		!numberIsInLine(grid, y, 0, n) &&
		!numberIsInSquare(extractSquare(grid, y, x), 0, 0, n)
	);
}
