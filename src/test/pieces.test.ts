import { describe, it, expect } from 'vitest';
import {
  createPiece,
  createRandomPiece,
  rotateShapeClockwise,
  getPieceCells,
  PIECE_SHAPES,
} from '../utils/pieces';

describe('pieces utilities', () => {
  describe('createPiece', () => {
    it('should create a piece with the correct type', () => {
      const piece = createPiece('I');
      expect(piece.type).toBe('I');
    });

    it('should create a piece with the correct shape', () => {
      const piece = createPiece('O');
      expect(piece.shape).toEqual(PIECE_SHAPES.O);
    });

    it('should create a piece with default position', () => {
      const piece = createPiece('T');
      expect(piece.position).toBeDefined();
      expect(piece.position.y).toBe(0);
    });

    it('should create a piece with custom position', () => {
      const piece = createPiece('L', { x: 5, y: 10 });
      expect(piece.position.x).toBe(5);
      expect(piece.position.y).toBe(10);
    });
  });

  describe('createRandomPiece', () => {
    it('should create a piece with a valid type', () => {
      const piece = createRandomPiece();
      const validTypes = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
      expect(validTypes).toContain(piece.type);
    });
  });

  describe('rotateShapeClockwise', () => {
    it('should rotate a 2x2 shape correctly', () => {
      const shape = [
        [1, 0],
        [0, 0],
      ];
      const rotated = rotateShapeClockwise(shape);
      expect(rotated).toEqual([
        [0, 1],
        [0, 0],
      ]);
    });

    it('should rotate a 3x3 shape correctly', () => {
      const shape = [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
      ];
      const rotated = rotateShapeClockwise(shape);
      expect(rotated).toEqual([
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0],
      ]);
    });
  });

  describe('getPieceCells', () => {
    it('should return the correct cells for an I piece', () => {
      const piece = createPiece('I', { x: 0, y: 0 });
      const cells = getPieceCells(piece);
      expect(cells).toHaveLength(4);
      expect(cells).toContainEqual({ x: 0, y: 1 });
      expect(cells).toContainEqual({ x: 1, y: 1 });
      expect(cells).toContainEqual({ x: 2, y: 1 });
      expect(cells).toContainEqual({ x: 3, y: 1 });
    });

    it('should return the correct cells for an O piece', () => {
      const piece = createPiece('O', { x: 0, y: 0 });
      const cells = getPieceCells(piece);
      expect(cells).toHaveLength(4);
      expect(cells).toContainEqual({ x: 0, y: 0 });
      expect(cells).toContainEqual({ x: 1, y: 0 });
      expect(cells).toContainEqual({ x: 0, y: 1 });
      expect(cells).toContainEqual({ x: 1, y: 1 });
    });
  });
});
