import { useGameStore } from '../store/gameStore';

/**
 * ScoreBoard component - displays current score and level
 */
export function ScoreBoard() {
  const score = useGameStore((state) => state.score);
  const level = useGameStore((state) => state.level);

  return (
    <div className="bg-gray-900 border-2 border-cyan-500 rounded-lg p-4 shadow-lg shadow-cyan-500/20">
      <h2 className="text-xl font-bold text-cyan-400 mb-4 text-center">SCORE</h2>
      <div className="space-y-3">
        <div className="bg-gray-800 rounded p-3 border border-cyan-500/30">
          <div className="text-sm text-gray-400 mb-1">Score</div>
          <div className="text-3xl font-bold text-cyan-400 font-mono">
            {score.toLocaleString()}
          </div>
        </div>
        <div className="bg-gray-800 rounded p-3 border border-cyan-500/30">
          <div className="text-sm text-gray-400 mb-1">Level</div>
          <div className="text-3xl font-bold text-purple-400 font-mono">{level}</div>
        </div>
      </div>
    </div>
  );
}
