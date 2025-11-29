// Game loop hook using requestAnimationFrame

import { useEffect, useRef } from 'react';
import { useGameStore } from '../store/gameStore';
import { BASE_SPEED, SPEED_DECREASE_PER_LEVEL, MIN_SPEED } from '../types/game';

/**
 * Calculate the game speed based on the current level
 */
function getSpeed(level: number): number {
  const speed = BASE_SPEED - (level - 1) * SPEED_DECREASE_PER_LEVEL;
  return Math.max(speed, MIN_SPEED);
}

/**
 * Custom hook that manages the game loop timing
 */
export function useGameLoop() {
  const tick = useGameStore(state => state.tick);
  const status = useGameStore(state => state.status);
  const level = useGameStore(state => state.level);
  
  const lastTickRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const gameLoop = (timestamp: number) => {
      if (status !== 'playing') {
        animationFrameRef.current = null;
        return;
      }

      const speed = getSpeed(level);
      
      if (timestamp - lastTickRef.current >= speed) {
        tick();
        lastTickRef.current = timestamp;
      }

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    if (status === 'playing') {
      lastTickRef.current = performance.now();
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    }

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [status, level, tick]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (status !== 'playing') return;

      const store = useGameStore.getState();

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          store.moveLeft();
          break;
        case 'ArrowRight':
          event.preventDefault();
          store.moveRight();
          break;
        case 'ArrowDown':
          event.preventDefault();
          store.moveDown();
          break;
        case 'ArrowUp':
          event.preventDefault();
          store.rotate();
          break;
        case ' ':
          event.preventDefault();
          store.hardDrop();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [status]);

  return { speed: getSpeed(level) };
}
