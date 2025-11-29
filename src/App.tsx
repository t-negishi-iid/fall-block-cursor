import { motion, AnimatePresence } from 'framer-motion';
import { Board } from './components/Board';
import { ScoreBoard } from './components/ScoreBoard';
import { NextPiece } from './components/NextPiece';
import { Controls } from './components/Controls';
import { useGameLoop } from './hooks/useGameLoop';
import { useGameStore } from './store/gameStore';
import './index.css';

function App() {
  useGameLoop();
  const status = useGameStore(state => state.status);

  return (
    <div className="p-4">
      <motion.h1
        className="text-3xl font-bold text-white text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        🎮 落ちゲー
      </motion.h1>

      <div className="flex flex-col lg:flex-row gap-4 items-start justify-center">
        {/* Left sidebar - Score and Next Piece */}
        <div className="flex flex-col gap-4">
          <ScoreBoard />
          <NextPiece />
        </div>

        {/* Main game board */}
        <div className="relative">
          <Board />
          
          {/* Game over overlay */}
          <AnimatePresence>
            {status === 'gameover' && (
              <motion.div
                className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="text-center"
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <p className="text-3xl font-bold text-red-500 mb-2">
                    ゲームオーバー
                  </p>
                  <p className="text-white">
                    もう一度チャレンジしよう！
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Paused overlay */}
          <AnimatePresence>
            {status === 'paused' && (
              <motion.div
                className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="text-2xl font-bold text-yellow-400">
                  一時停止中
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right sidebar - Controls */}
        <Controls />
      </div>

      <footer className="text-center text-gray-500 text-sm mt-6">
        Built with React + Vite + TypeScript + Tailwind CSS
      </footer>
    </div>
  );
}

export default App;
