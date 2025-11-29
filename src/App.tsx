import { Board } from './components/Board';

/**
 * Main App component
 */
function App() {
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
