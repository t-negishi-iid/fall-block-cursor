import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';

/**
 * StartScreen component - displays before game starts
 */
export function StartScreen() {
  const isPlaying = useGameStore((state) => state.isPlaying);
  const isGameOver = useGameStore((state) => state.isGameOver);
  const startGame = useGameStore((state) => state.startGame);

  // Don't show if game is playing or game over
  if (isPlaying || isGameOver) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
        className="bg-gray-900 border-2 border-cyan-500 rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl shadow-cyan-500/30"
      >
        <motion.h1
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-6 text-center drop-shadow-lg"
        >
          Vibe Blocks
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-400 text-center mb-8"
        >
          Falling Block Puzzle Game
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={startGame}
          className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-bold py-4 px-6 rounded-lg transition-all shadow-lg shadow-cyan-500/50 text-xl"
        >
          Start Game
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
