// Type definitions for the Tetris-like falling block game

export type PieceType = 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L';

export type CellValue = PieceType | null;

export interface Position {
  x: number;
  y: number;
}

export interface Piece {
  type: PieceType;
  shape: number[][];
  position: Position;
  rotation: number;
}

export type Board = CellValue[][];

export type GameStatus = 'idle' | 'playing' | 'paused' | 'gameover';

export interface GameState {
  board: Board;
  currentPiece: Piece | null;
  nextPiece: Piece | null;
  score: number;
  level: number;
  lines: number;
  status: GameStatus;
}

export interface GameActions {
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  moveLeft: () => void;
  moveRight: () => void;
  moveDown: () => void;
  rotate: () => void;
  hardDrop: () => void;
  tick: () => void;
  resetGame: () => void;
}

export type GameStore = GameState & GameActions;

// Piece colors for rendering
export const PIECE_COLORS: Record<PieceType, string> = {
  I: 'bg-cyan-500',
  O: 'bg-yellow-500',
  T: 'bg-purple-500',
  S: 'bg-green-500',
  Z: 'bg-red-500',
  J: 'bg-blue-500',
  L: 'bg-orange-500',
};

// Board dimensions
export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

// Game speed constants (milliseconds)
export const BASE_SPEED = 1000;
export const SPEED_DECREASE_PER_LEVEL = 50;
export const MIN_SPEED = 100;
