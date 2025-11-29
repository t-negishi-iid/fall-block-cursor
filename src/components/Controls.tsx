// Game controls component

import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';

export function Controls() {
  const status = useGameStore(state => state.status);
  const startGame = useGameStore(state => state.startGame);
  const pauseGame = useGameStore(state => state.pauseGame);
  const resumeGame = useGameStore(state => state.resumeGame);
  const resetGame = useGameStore(state => state.resetGame);
  const moveLeft = useGameStore(state => state.moveLeft);
  const moveRight = useGameStore(state => state.moveRight);
  const moveDown = useGameStore(state => state.moveDown);
  const rotate = useGameStore(state => state.rotate);
  const hardDrop = useGameStore(state => state.hardDrop);

  const buttonClass = "px-4 py-2 rounded-lg font-semibold transition-all duration-200 active:scale-95";
  const primaryButtonClass = `${buttonClass} bg-blue-600 hover:bg-blue-700 text-white`;
  const secondaryButtonClass = `${buttonClass} bg-gray-600 hover:bg-gray-700 text-white`;
  const controlButtonClass = `${buttonClass} bg-gray-700 hover:bg-gray-600 text-white min-w-[50px]`;

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <h2 className="text-lg font-bold text-white mb-4 text-center">操作</h2>
      
      {/* Game control buttons */}
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {status === 'idle' && (
          <motion.button
            className={primaryButtonClass}
            onClick={startGame}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ゲーム開始
          </motion.button>
        )}

        {status === 'playing' && (
          <motion.button
            className={secondaryButtonClass}
            onClick={pauseGame}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            一時停止
          </motion.button>
        )}

        {status === 'paused' && (
          <motion.button
            className={primaryButtonClass}
            onClick={resumeGame}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            再開
          </motion.button>
        )}

        {status === 'gameover' && (
          <motion.button
            className={primaryButtonClass}
            onClick={startGame}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            もう一度
          </motion.button>
        )}

        {(status === 'playing' || status === 'paused' || status === 'gameover') && (
          <motion.button
            className={secondaryButtonClass}
            onClick={resetGame}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            リセット
          </motion.button>
        )}
      </div>

      {/* Touch controls for mobile */}
      {status === 'playing' && (
        <div className="mt-4">
          <p className="text-gray-400 text-sm text-center mb-2">タッチ操作</p>
          <div className="grid grid-cols-3 gap-2 max-w-[180px] mx-auto">
            <div></div>
            <button
              className={controlButtonClass}
              onClick={rotate}
              aria-label="回転"
            >
              ↻
            </button>
            <div></div>
            
            <button
              className={controlButtonClass}
              onClick={moveLeft}
              aria-label="左移動"
            >
              ←
            </button>
            <button
              className={controlButtonClass}
              onClick={hardDrop}
              aria-label="ハードドロップ"
            >
              ↓↓
            </button>
            <button
              className={controlButtonClass}
              onClick={moveRight}
              aria-label="右移動"
            >
              →
            </button>
            
            <div></div>
            <button
              className={controlButtonClass}
              onClick={moveDown}
              aria-label="下移動"
            >
              ↓
            </button>
            <div></div>
          </div>
        </div>
      )}

      {/* Keyboard instructions */}
      <div className="mt-4 text-gray-400 text-xs">
        <p className="text-center mb-2">キーボード操作:</p>
        <div className="grid grid-cols-2 gap-1 text-center">
          <span>← →</span>
          <span>移動</span>
          <span>↑</span>
          <span>回転</span>
          <span>↓</span>
          <span>落下</span>
          <span>Space</span>
          <span>即落下</span>
        </div>
      </div>
    </div>
  );
}
