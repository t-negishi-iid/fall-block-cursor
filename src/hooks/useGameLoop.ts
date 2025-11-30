import { useEffect, useRef } from 'react';
import { useGameStore } from '../store/gameStore';

/**
 * Game loop hook
 * Calls drop action at regular intervals based on current level
 * Drop speed increases (interval decreases) as level increases
 * Stops when game is over or paused
 */
export function useGameLoop(): void {
  const drop = useGameStore((state) => state.drop);
  const getDropSpeed = useGameStore((state) => state.getDropSpeed);
  const isGameOver = useGameStore((state) => state.isGameOver);
  const isPaused = useGameStore((state) => state.isPaused);
  const isPlaying = useGameStore((state) => state.isPlaying);
  const level = useGameStore((state) => state.level);
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

    // Get current drop speed based on level
    const dropSpeed = getDropSpeed();

    // Start the game loop with level-based speed
    intervalRef.current = window.setInterval(() => {
      const currentState = useGameStore.getState();
      if (currentState.isPlaying && !currentState.isGameOver && !currentState.isPaused) {
        drop();
      }
    }, dropSpeed);

    // Cleanup on unmount or when dependencies change
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [drop, getDropSpeed, isPlaying, isGameOver, isPaused, level]);
}
