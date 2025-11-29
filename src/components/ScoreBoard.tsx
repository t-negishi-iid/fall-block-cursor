// Score board component

import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';

export function ScoreBoard() {
  const score = useGameStore(state => state.score);
  const level = useGameStore(state => state.level);
  const lines = useGameStore(state => state.lines);

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg min-w-[150px]">
      <h2 className="text-lg font-bold text-white mb-4 text-center">スコア</h2>
      
      <div className="space-y-3">
        <div className="text-center">
          <p className="text-gray-400 text-sm">得点</p>
          <motion.p
            key={score}
            className="text-2xl font-bold text-white"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {score.toLocaleString()}
          </motion.p>
        </div>

        <div className="text-center">
          <p className="text-gray-400 text-sm">レベル</p>
          <motion.p
            key={level}
            className="text-xl font-bold text-green-400"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {level}
          </motion.p>
        </div>

        <div className="text-center">
          <p className="text-gray-400 text-sm">ライン</p>
          <p className="text-xl font-bold text-blue-400">{lines}</p>
        </div>
      </div>
    </div>
  );
}
