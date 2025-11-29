import { describe, it, expect } from 'vitest';
import {
  checkCollision,
  canMove,
  placePiece,
  clearLines,
  createEmptyBoard,
} from '../utils/collision';
import { createPiece } from '../utils/pieces';
import { BOARD_WIDTH, BOARD_HEIGHT } from '../types/game';

describe('collision utilities', () => {
  describe('createEmptyBoard', () => {
    it('should create a board with correct dimensions', () => {
      const board = createEmptyBoard();
      expect(board.length).toBe(BOARD_HEIGHT);
      expect(board[0].length).toBe(BOARD_WIDTH);
    });

    it('should create a board with all null values', () => {
      const board = createEmptyBoard();
      for (const row of board) {
        for (const cell of row) {
          expect(cell).toBeNull();
        }
      }
    });
  });

  describe('checkCollision', () => {
    it('should detect collision with left boundary', () => {
      const board = createEmptyBoard();
      const piece = createPiece('O', { x: -1, y: 0 });
      expect(checkCollision(board, piece)).toBe(true);
    });

    it('should detect collision with right boundary', () => {
      const board = createEmptyBoard();
      const piece = createPiece('O', { x: BOARD_WIDTH, y: 0 });
      expect(checkCollision(board, piece)).toBe(true);
    });

    it('should detect collision with bottom boundary', () => {
      const board = createEmptyBoard();
      const piece = createPiece('O', { x: 0, y: BOARD_HEIGHT });
      expect(checkCollision(board, piece)).toBe(true);
    });

    it('should not detect collision for valid position', () => {
      const board = createEmptyBoard();
      const piece = createPiece('O', { x: 4, y: 0 });
      expect(checkCollision(board, piece)).toBe(false);
    });
  });

  describe('canMove', () => {
    it('should return true for valid move', () => {
      const board = createEmptyBoard();
      const piece = createPiece('O', { x: 4, y: 0 });
      expect(canMove(board, piece, 1, 0)).toBe(true);
      expect(canMove(board, piece, 0, 1)).toBe(true);
    });

    it('should return false for move into boundary', () => {
      const board = createEmptyBoard();
      const piece = createPiece('O', { x: 0, y: 0 });
      expect(canMove(board, piece, -1, 0)).toBe(false);
    });
  });

  describe('placePiece', () => {
    it('should place a piece on the board', () => {
      const board = createEmptyBoard();
      const piece = createPiece('O', { x: 0, y: 0 });
      const newBoard = placePiece(board, piece);
      
      expect(newBoard[0][0]).toBe('O');
      expect(newBoard[0][1]).toBe('O');
      expect(newBoard[1][0]).toBe('O');
      expect(newBoard[1][1]).toBe('O');
    });

    it('should not modify the original board', () => {
      const board = createEmptyBoard();
      const piece = createPiece('O', { x: 0, y: 0 });
      placePiece(board, piece);
      
      expect(board[0][0]).toBeNull();
    });
  });

  describe('clearLines', () => {
    it('should clear completed lines', () => {
      const board = createEmptyBoard();
      
      // Fill the bottom row
      for (let x = 0; x < BOARD_WIDTH; x++) {
        board[BOARD_HEIGHT - 1][x] = 'I';
      }
      
      const { newBoard, linesCleared } = clearLines(board);
      
      expect(linesCleared).toBe(1);
      expect(newBoard[BOARD_HEIGHT - 1].every(cell => cell === null)).toBe(true);
    });

    it('should return 0 when no lines are completed', () => {
      const board = createEmptyBoard();
      board[BOARD_HEIGHT - 1][0] = 'I';
      
      const { linesCleared } = clearLines(board);
      
      expect(linesCleared).toBe(0);
    });
  });
});
