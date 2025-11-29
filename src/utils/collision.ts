import type { Grid, Position, Tetromino, TetrominoShape } from '../types/game';
import { getTetrominoShape } from './pieces';

/**
 * Grid dimensions
 */
const GRID_ROWS = 20;
const GRID_COLS = 10;

/**
 * Rotate a tetromino shape 90 degrees clockwise
 */
function rotateShape(shape: TetrominoShape): TetrominoShape {
  const rows = shape.length;
  const cols = shape[0]?.length || 0;
  const rotated: TetrominoShape = [];

  for (let x = 0; x < cols; x++) {
    const newRow: boolean[] = [];
    for (let y = rows - 1; y >= 0; y--) {
      newRow.push(shape[y]?.[x] ?? false);
    }
    rotated.push(newRow);
  }

  return rotated;
}

/**
 * Get the rotated shape for a tetromino based on its rotation state
 */
export function getRotatedShape(tetromino: Tetromino): TetrominoShape {
  let shape = getTetrominoShape(tetromino.type);
  for (let i = 0; i < tetromino.rotation; i++) {
    shape = rotateShape(shape);
  }
  return shape;
}

/**
 * Check if a position is valid for a tetromino
 * Returns true if the tetromino can be placed at the given position
 */
export function isValidPosition(
  grid: Grid,
  tetromino: Tetromino,
  offsetX: number = 0,
  offsetY: number = 0
): boolean {
  const shape = getRotatedShape(tetromino);
  const newX = tetromino.position.x + offsetX;
  const newY = tetromino.position.y + offsetY;

  // Check each cell of the tetromino shape
  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row]?.length || 0; col++) {
      if (shape[row]?.[col]) {
        const gridX = newX + col;
        const gridY = newY + row;

        // Check if out of bounds
        if (gridX < 0 || gridX >= GRID_COLS || gridY < 0 || gridY >= GRID_ROWS) {
          return false;
        }

        // Check if cell is already occupied
        if (grid[gridY]?.[gridX] !== 0) {
          return false;
        }
      }
    }
  }

  return true;
}
