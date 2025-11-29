import type { TetrominoShape, TetrominoType } from '../types/game';

/**
 * Tetromino shape definitions
 * Each shape is defined as a 2D boolean array
 * true = filled cell, false = empty cell
 */

/**
 * I-piece (cyan)
 */
const I_SHAPE: TetrominoShape = [
  [false, false, false, false],
  [true, true, true, true],
  [false, false, false, false],
  [false, false, false, false],
];

/**
 * O-piece (yellow)
 */
const O_SHAPE: TetrominoShape = [
  [true, true],
  [true, true],
];

/**
 * T-piece (purple)
 */
const T_SHAPE: TetrominoShape = [
  [false, true, false],
  [true, true, true],
  [false, false, false],
];

/**
 * S-piece (green)
 */
const S_SHAPE: TetrominoShape = [
  [false, true, true],
  [true, true, false],
  [false, false, false],
];

/**
 * Z-piece (red)
 */
const Z_SHAPE: TetrominoShape = [
  [true, true, false],
  [false, true, true],
  [false, false, false],
];

/**
 * J-piece (blue)
 */
const J_SHAPE: TetrominoShape = [
  [true, false, false],
  [true, true, true],
  [false, false, false],
];

/**
 * L-piece (orange)
 */
const L_SHAPE: TetrominoShape = [
  [false, false, true],
  [true, true, true],
  [false, false, false],
];

/**
 * Tetromino shape definitions mapped by type
 */
export const TETROMINO_SHAPES: Record<TetrominoType, TetrominoShape> = {
  1: I_SHAPE,
  2: O_SHAPE,
  3: T_SHAPE,
  4: S_SHAPE,
  5: Z_SHAPE,
  6: J_SHAPE,
  7: L_SHAPE,
};

/**
 * Tailwind CSS v4 color classes for each tetromino type
 * Using standard Tailwind color palette
 */
export const TETROMINO_COLORS: Record<TetrominoType, string> = {
  1: 'bg-cyan-500', // I-piece - Cyan
  2: 'bg-yellow-500', // O-piece - Yellow
  3: 'bg-purple-500', // T-piece - Purple
  4: 'bg-green-500', // S-piece - Green
  5: 'bg-red-500', // Z-piece - Red
  6: 'bg-blue-500', // J-piece - Blue
  7: 'bg-orange-500', // L-piece - Orange
};

/**
 * Get the shape for a tetromino type
 */
export function getTetrominoShape(type: TetrominoType): TetrominoShape {
  return TETROMINO_SHAPES[type];
}

/**
 * Get the color class for a tetromino type
 */
export function getTetrominoColor(type: TetrominoType): string {
  return TETROMINO_COLORS[type];
}
