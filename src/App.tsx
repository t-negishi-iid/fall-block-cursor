import { useEffect } from 'react';
import { Board } from './components/Board';
import { useGameStore } from './store/gameStore';
import { useGameLoop } from './hooks/useGameLoop';

/**
 * Main App component
 */
function App() {
  const moveLeft = useGameStore((state) => state.moveLeft);
  const moveRight = useGameStore((state) => state.moveRight);
  const rotate = useGameStore((state) => state.rotate);
  const drop = useGameStore((state) => state.drop);

  // Start the game loop
  useGameLoop();

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          moveLeft();
          break;
        case 'ArrowRight':
          event.preventDefault();
          moveRight();
          break;
        case 'ArrowUp':
          event.preventDefault();
          rotate();
          break;
        case 'ArrowDown':
          event.preventDefault();
          drop();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [moveLeft, moveRight, rotate, drop]);

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-white mb-8">
        TETRIS (Vibe Coding)
      </h1>
      <Board />
    </div>
  );
}

export default App
