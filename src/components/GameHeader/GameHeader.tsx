import { useNavigate } from 'react-router';
import { useMemoryStore } from '../../store/game-store';

const GameHeader = () => {
  const {
    restartGameReset,
    gridSize,
    setTiles,
    setIsWinnerAvailable,
    resetAll,
    setIsMobileMenuVisible,
    resetTimer,
    startTimer,
    noOfplayers,
  } = useMemoryStore();

  const navigate = useNavigate();

  const handleRestart = () => {
    restartGameReset();
    setTiles(gridSize);
    setIsWinnerAvailable(false);
    if (noOfplayers === 1) {
      resetTimer();
      startTimer();
    }
  };

  const hanldeNewGameReset = () => {
    navigate('/');
    resetAll();
  };

  return (
    <div className="flex w-full items-center justify-between">
      <h1 className="text-tail-slate-800 md:text-title text-2xl font-bold">
        memory
      </h1>

      <div className="hidden items-center gap-x-4 md:flex">
        <button
          onClick={handleRestart}
          className="bg-tail-amber-500 text-tail-zinc-50 cursor-pointer rounded-full px-8 py-3.5 text-xl font-bold hover:opacity-80"
        >
          Restart
        </button>
        <button
          onClick={hanldeNewGameReset}
          className="bg-tail-slate-300 hover:bg-tail-slate-400 hover:text-tail-zinc-50 text-tail-slate-700 cursor-pointer rounded-full px-8 py-3.5 text-xl font-bold transition-colors"
        >
          New Game
        </button>
      </div>

      <div className="md:hidden">
        <button
          onClick={() => setIsMobileMenuVisible(true)}
          className="text-tail-zinc-50 bg-tail-amber-500 cursor-pointer rounded-full px-4.5 py-2.5 font-bold"
        >
          Menu
        </button>
      </div>
    </div>
  );
};

export default GameHeader;
