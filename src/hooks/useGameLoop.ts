import { useEffect, useRef } from 'react';
import { useGameStore } from '../store/gameStore';

/**
 * Game loop hook
 * Calls drop action at regular intervals (1000ms)
 * Stops when game is over or paused
 */
export function useGameLoop(): void {
  const drop = useGameStore((state) => state.drop);
  const isGameOver = useGameStore((state) => state.isGameOver);
  const isPaused = useGameStore((state) => state.isPaused);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Don't start loop if game is over or paused
    if (isGameOver || isPaused) {
      return;
    }

    // Start the game loop
    intervalRef.current = window.setInterval(() => {
      const currentIsGameOver = useGameStore.getState().isGameOver;
      const currentIsPaused = useGameStore.getState().isPaused;

      if (!currentIsGameOver && !currentIsPaused) {
        drop();
      }
    }, 1000);

    // Cleanup on unmount or when dependencies change
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [drop, isGameOver, isPaused]);
}
