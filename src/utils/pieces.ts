// Piece definitions and utilities

import type { Piece, PieceType, Position } from '../types/game';

// Piece shapes defined as 2D arrays
// 1 represents a filled cell, 0 represents empty
export const PIECE_SHAPES: Record<PieceType, number[][]> = {
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  O: [
    [1, 1],
    [1, 1],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
};

const PIECE_TYPES: PieceType[] = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];

/**
 * Generate a random piece type
 */
export function getRandomPieceType(): PieceType {
  const randomIndex = Math.floor(Math.random() * PIECE_TYPES.length);
  return PIECE_TYPES[randomIndex];
}

/**
 * Create a new piece with the given type
 */
export function createPiece(type: PieceType, startPosition?: Position): Piece {
  const shape = PIECE_SHAPES[type];
  const defaultPosition: Position = {
    x: Math.floor((10 - shape[0].length) / 2),
    y: 0,
  };

  return {
    type,
    shape: shape.map(row => [...row]),
    position: startPosition || defaultPosition,
    rotation: 0,
  };
}

/**
 * Create a random piece
 */
export function createRandomPiece(startPosition?: Position): Piece {
  const type = getRandomPieceType();
  return createPiece(type, startPosition);
}

/**
 * Rotate a piece shape clockwise
 */
export function rotateShapeClockwise(shape: number[][]): number[][] {
  const rows = shape.length;
  const cols = shape[0].length;
  const rotated: number[][] = [];

  for (let col = 0; col < cols; col++) {
    const newRow: number[] = [];
    for (let row = rows - 1; row >= 0; row--) {
      newRow.push(shape[row][col]);
    }
    rotated.push(newRow);
  }

  return rotated;
}

/**
 * Get the cells occupied by a piece at its current position
 */
export function getPieceCells(piece: Piece): Position[] {
  const cells: Position[] = [];
  const { shape, position } = piece;

  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (shape[row][col] === 1) {
        cells.push({
          x: position.x + col,
          y: position.y + row,
        });
      }
    }
  }

  return cells;
}
