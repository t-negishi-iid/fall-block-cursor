import { useEffect } from 'react';
import { Board } from './components/Board';
import { ScoreBoard } from './components/ScoreBoard';
import { NextPiece } from './components/NextPiece';
import { GameOverModal } from './components/GameOverModal';
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
  const isGameOver = useGameStore((state) => state.isGameOver);

  // Start the game loop
  useGameLoop();

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isGameOver) return;

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
  }, [moveLeft, moveRight, rotate, drop, isGameOver]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Title */}
      <div className="pt-8 pb-4 text-center">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2 drop-shadow-lg">
          TETRIS
        </h1>
        <p className="text-gray-400 text-sm">Vibe Coding Edition</p>
      </div>

      {/* Main Content - 2 Column Layout */}
      <div className="container mx-auto px-4 pb-8">
        <div className="flex flex-col lg:flex-row gap-6 items-start justify-center">
          {/* Left: Game Board */}
          <div className="flex-shrink-0">
            <Board />
          </div>

          {/* Right: Info Panel */}
          <div className="flex flex-col gap-4 w-full lg:w-auto">
            <NextPiece />
            <ScoreBoard />

            {/* Controls Info */}
            <div className="bg-gray-900 border-2 border-green-500 rounded-lg p-4 shadow-lg shadow-green-500/20">
              <h2 className="text-xl font-bold text-green-400 mb-3 text-center">CONTROLS</h2>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <kbd className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-xs">←</kbd>
                  <span>Move Left</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-xs">→</kbd>
                  <span>Move Right</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-xs">↑</kbd>
                  <span>Rotate</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-xs">↓</kbd>
                  <span>Drop</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Game Over Modal */}
      <GameOverModal />
    </div>
  );
}

export default App
