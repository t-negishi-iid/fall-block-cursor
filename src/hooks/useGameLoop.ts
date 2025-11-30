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
  const isPlaying = useGameStore((state) => state.isPlaying);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Don't start loop if game is not playing, over, or paused
    if (!isPlaying || isGameOver || isPaused) {
      return;
    }

    // Start the game loop
    intervalRef.current = window.setInterval(() => {
      const currentState = useGameStore.getState();
      if (currentState.isPlaying && !currentState.isGameOver && !currentState.isPaused) {
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
  }, [drop, isPlaying, isGameOver, isPaused]);
}
