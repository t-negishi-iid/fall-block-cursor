// Collision detection utilities

import type { Board, Piece } from '../types/game';
import { BOARD_WIDTH, BOARD_HEIGHT } from '../types/game';
import { getPieceCells } from './pieces';

/**
 * Check if a piece collides with the board boundaries or other pieces
 */
export function checkCollision(board: Board, piece: Piece): boolean {
  const cells = getPieceCells(piece);

  for (const cell of cells) {
    // Check boundaries
    if (cell.x < 0 || cell.x >= BOARD_WIDTH || cell.y >= BOARD_HEIGHT) {
      return true;
    }

    // Check collision with placed pieces (only if the cell is within the board)
    if (cell.y >= 0 && board[cell.y][cell.x] !== null) {
      return true;
    }
  }

  return false;
}

/**
 * Check if a piece can move to a new position
 */
export function canMove(board: Board, piece: Piece, dx: number, dy: number): boolean {
  const movedPiece: Piece = {
    ...piece,
    position: {
      x: piece.position.x + dx,
      y: piece.position.y + dy,
    },
  };

  return !checkCollision(board, movedPiece);
}

/**
 * Check if a rotated piece is valid
 */
export function canRotate(board: Board, piece: Piece, newShape: number[][]): boolean {
  const rotatedPiece: Piece = {
    ...piece,
    shape: newShape,
  };

  // Try the rotation at the current position
  if (!checkCollision(board, rotatedPiece)) {
    return true;
  }

  // Try wall kicks (simple version)
  const kicks = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: -1 },
    { x: 2, y: 0 },
    { x: -2, y: 0 },
  ];

  for (const kick of kicks) {
    const kickedPiece: Piece = {
      ...rotatedPiece,
      position: {
        x: piece.position.x + kick.x,
        y: piece.position.y + kick.y,
      },
    };

    if (!checkCollision(board, kickedPiece)) {
      return true;
    }
  }

  return false;
}

/**
 * Get the kick offset for a valid rotation
 */
export function getRotationKick(board: Board, piece: Piece, newShape: number[][]): { x: number; y: number } | null {
  const rotatedPiece: Piece = {
    ...piece,
    shape: newShape,
  };

  // Try the rotation at the current position
  if (!checkCollision(board, rotatedPiece)) {
    return { x: 0, y: 0 };
  }

  // Try wall kicks
  const kicks = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: -1 },
    { x: 2, y: 0 },
    { x: -2, y: 0 },
  ];

  for (const kick of kicks) {
    const kickedPiece: Piece = {
      ...rotatedPiece,
      position: {
        x: piece.position.x + kick.x,
        y: piece.position.y + kick.y,
      },
    };

    if (!checkCollision(board, kickedPiece)) {
      return kick;
    }
  }

  return null;
}

/**
 * Place a piece on the board
 */
export function placePiece(board: Board, piece: Piece): Board {
  const newBoard = board.map(row => [...row]);
  const cells = getPieceCells(piece);

  for (const cell of cells) {
    if (cell.y >= 0 && cell.y < BOARD_HEIGHT && cell.x >= 0 && cell.x < BOARD_WIDTH) {
      newBoard[cell.y][cell.x] = piece.type;
    }
  }

  return newBoard;
}

/**
 * Clear completed lines and return the new board and number of lines cleared
 */
export function clearLines(board: Board): { newBoard: Board; linesCleared: number } {
  const newBoard: Board = [];
  let linesCleared = 0;

  // Check each row from bottom to top
  for (let row = 0; row < BOARD_HEIGHT; row++) {
    const isComplete = board[row].every(cell => cell !== null);
    
    if (isComplete) {
      linesCleared++;
    } else {
      newBoard.push([...board[row]]);
    }
  }

  // Add empty rows at the top
  while (newBoard.length < BOARD_HEIGHT) {
    newBoard.unshift(Array(BOARD_WIDTH).fill(null));
  }

  return { newBoard, linesCleared };
}

/**
 * Check if the game is over (piece spawns in an occupied area)
 */
export function isGameOver(board: Board, piece: Piece): boolean {
  return checkCollision(board, piece);
}

/**
 * Create an empty board
 */
export function createEmptyBoard(): Board {
  return Array.from({ length: BOARD_HEIGHT }, () =>
    Array(BOARD_WIDTH).fill(null)
  );
}
