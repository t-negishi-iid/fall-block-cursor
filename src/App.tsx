import { useEffect } from 'react';
import { Board } from './components/Board';
import { ScoreBoard } from './components/ScoreBoard';
import { NextPiece } from './components/NextPiece';
import { GameOverModal } from './components/GameOverModal';
import { StartScreen } from './components/StartScreen';
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
  const hardDrop = useGameStore((state) => state.hardDrop);
  const isGameOver = useGameStore((state) => state.isGameOver);
  const isPlaying = useGameStore((state) => state.isPlaying);
  const isHardMode = useGameStore((state) => state.isHardMode);
  const toggleHardMode = useGameStore((state) => state.toggleHardMode);

  // Start the game loop
  useGameLoop();

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isGameOver || !isPlaying) return;

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
        case ' ':
          event.preventDefault();
          hardDrop();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [moveLeft, moveRight, rotate, drop, hardDrop, isGameOver, isPlaying]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Title */}
      <div className="pt-8 pb-4 text-center">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2 drop-shadow-lg">
          Vibe Blocks
        </h1>
        <p className="text-gray-400 text-sm">Falling Block Puzzle Game</p>
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

            {/* Settings */}
            <div className="bg-gray-900 border-2 border-orange-500 rounded-lg p-4 shadow-lg shadow-orange-500/20">
              <h2 className="text-xl font-bold text-orange-400 mb-3 text-center">SETTINGS</h2>
              <div className="space-y-3">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm text-gray-300">Hard Mode</span>
                  <div className="relative inline-block w-12 h-6">
                    <input
                      type="checkbox"
                      checked={isHardMode}
                      onChange={toggleHardMode}
                      className="sr-only peer"
                    />
                    <div className="w-12 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                  </div>
                </label>
                {isHardMode && (
                  <p className="text-xs text-orange-300 mt-2">
                    Grid lines hidden - higher difficulty
                  </p>
                )}
              </div>
            </div>

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
                <div className="flex items-center gap-2">
                  <kbd className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-xs">Space</kbd>
                  <span>Hard Drop</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Start Screen */}
      <StartScreen />

      {/* Game Over Modal */}
      <GameOverModal />
    </div>
  );
}

export default App
