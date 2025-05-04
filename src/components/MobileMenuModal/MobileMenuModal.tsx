import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { useMemoryStore } from '../../store/game-store';

const MobileMenuModal = () => {
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      exit={{ opacity: 0 }}
      className="fixed flex size-full min-h-screen flex-col items-center justify-center bg-black/75"
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.3,
          delay: 0.2,
          type: 'spring',
          bounce: 0,
        }}
        className="bg-tail-zinc-50 flex w-[85%] flex-col gap-y-4 rounded-2xl p-6"
      >
        <button
          onClick={handleRestart}
          className="text-tail-zinc-50 bg-tail-amber-500 flex w-full cursor-pointer justify-center rounded-full py-3.5 text-lg font-bold transition-colors hover:opacity-80 md:text-xl"
        >
          Restart
        </button>
        <button
          onClick={hanldeNewGameReset}
          className="text-tail-slate-700 hover:bg-tail-slate-400 hover:text-tail-zinc-50 flex w-full cursor-pointer justify-center rounded-full bg-slate-200 py-3.5 text-lg font-bold transition-colors md:text-xl"
        >
          New Game
        </button>
        <button
          onClick={() => setIsMobileMenuVisible(false)}
          className="text-tail-slate-700 hover:bg-tail-slate-400 hover:text-tail-zinc-50 flex w-full cursor-pointer justify-center rounded-full bg-slate-200 py-3.5 text-lg font-bold transition-colors md:text-xl"
        >
          Resume Game
        </button>
      </motion.div>
    </motion.div>
  );
};

export default MobileMenuModal;
