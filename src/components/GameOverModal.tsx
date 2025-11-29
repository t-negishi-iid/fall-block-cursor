import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/gameStore';

/**
 * GameOverModal component - displays game over modal with animation
 */
export function GameOverModal() {
  const isGameOver = useGameStore((state) => state.isGameOver);
  const score = useGameStore((state) => state.score);
  const resetGame = useGameStore((state) => state.resetGame);

  return (
    <AnimatePresence>
      {isGameOver && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
            onClick={resetGame}
          />
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-gray-900 border-2 border-red-500 rounded-lg p-8 max-w-md w-full shadow-2xl shadow-red-500/30">
              <motion.h2
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="text-4xl font-bold text-red-400 mb-4 text-center"
              >
                GAME OVER
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center mb-6"
              >
                <div className="text-gray-400 mb-2">Final Score</div>
                <div className="text-3xl font-bold text-cyan-400 font-mono">
                  {score.toLocaleString()}
                </div>
              </motion.div>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetGame}
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg shadow-cyan-500/50"
              >
                Try Again
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
