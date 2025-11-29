import { describe, it, expect, beforeEach } from 'vitest';
import { useGameStore } from '../store/gameStore';

describe('gameStore', () => {
  beforeEach(() => {
    useGameStore.getState().resetGame();
  });

  describe('initial state', () => {
    it('should have idle status initially', () => {
      const state = useGameStore.getState();
      expect(state.status).toBe('idle');
    });

    it('should have null current piece initially', () => {
      const state = useGameStore.getState();
      expect(state.currentPiece).toBeNull();
    });

    it('should have score of 0 initially', () => {
      const state = useGameStore.getState();
      expect(state.score).toBe(0);
    });
  });

  describe('startGame', () => {
    it('should set status to playing', () => {
      useGameStore.getState().startGame();
      const state = useGameStore.getState();
      expect(state.status).toBe('playing');
    });

    it('should create current piece', () => {
      useGameStore.getState().startGame();
      const state = useGameStore.getState();
      expect(state.currentPiece).not.toBeNull();
    });

    it('should create next piece', () => {
      useGameStore.getState().startGame();
      const state = useGameStore.getState();
      expect(state.nextPiece).not.toBeNull();
    });
  });

  describe('pauseGame', () => {
    it('should set status to paused when playing', () => {
      useGameStore.getState().startGame();
      useGameStore.getState().pauseGame();
      const state = useGameStore.getState();
      expect(state.status).toBe('paused');
    });

    it('should not change status when not playing', () => {
      useGameStore.getState().pauseGame();
      const state = useGameStore.getState();
      expect(state.status).toBe('idle');
    });
  });

  describe('resumeGame', () => {
    it('should set status to playing when paused', () => {
      useGameStore.getState().startGame();
      useGameStore.getState().pauseGame();
      useGameStore.getState().resumeGame();
      const state = useGameStore.getState();
      expect(state.status).toBe('playing');
    });
  });

  describe('moveLeft', () => {
    it('should move the piece left when playing', () => {
      useGameStore.getState().startGame();
      const initialX = useGameStore.getState().currentPiece?.position.x;
      useGameStore.getState().moveLeft();
      const newX = useGameStore.getState().currentPiece?.position.x;
      
      if (initialX !== undefined && newX !== undefined) {
        expect(newX).toBe(initialX - 1);
      }
    });
  });

  describe('moveRight', () => {
    it('should move the piece right when playing', () => {
      useGameStore.getState().startGame();
      const initialX = useGameStore.getState().currentPiece?.position.x;
      useGameStore.getState().moveRight();
      const newX = useGameStore.getState().currentPiece?.position.x;
      
      if (initialX !== undefined && newX !== undefined) {
        expect(newX).toBe(initialX + 1);
      }
    });
  });

  describe('resetGame', () => {
    it('should reset all state to initial values', () => {
      useGameStore.getState().startGame();
      useGameStore.getState().resetGame();
      const state = useGameStore.getState();
      
      expect(state.status).toBe('idle');
      expect(state.currentPiece).toBeNull();
      expect(state.score).toBe(0);
      expect(state.level).toBe(1);
      expect(state.lines).toBe(0);
    });
  });
});
