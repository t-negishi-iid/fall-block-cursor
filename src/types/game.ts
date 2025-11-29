/**
 * Game type definitions
 */

/**
 * Cell value in the grid
 * 0 = empty, 1-7 = different tetromino types
 */
export type CellValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

/**
 * 2D Grid representation (20 rows x 10 columns)
 * Grid[y][x] where {x: 0, y: 0} is top-left
 */
export type Grid = CellValue[][];

/**
 * Tetromino type identifier
 */
export type TetrominoType = 1 | 2 | 3 | 4 | 5 | 6 | 7;

/**
 * Coordinate position
 */
export interface Position {
  x: number;
  y: number;
}

/**
 * Tetromino shape definition
 * 2D array where true represents a filled cell
 */
export type TetrominoShape = boolean[][];

/**
 * Tetromino with position and rotation
 */
export interface Tetromino {
  type: TetrominoType;
  position: Position;
  rotation: number; // 0, 1, 2, 3 (0°, 90°, 180°, 270°)
}

/**
 * Game state
 */
export interface GameState {
  grid: Grid;
  currentPiece: Tetromino | null;
  isGameOver: boolean;
  isPaused: boolean;
}
