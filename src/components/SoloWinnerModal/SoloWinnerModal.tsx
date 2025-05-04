import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { useMemoryStore } from '../../store/game-store';

const SoloWinnerModal = () => {
  const {
    time,
    moves,
    restartGameReset,
    setTiles,
    gridSize,
    setIsSoloWinnerAvailable,
    resetAll,
    startTimer,
  } = useMemoryStore();

  const navigate = useNavigate();

  const handleRestart = () => {
    restartGameReset();
    setTiles(gridSize);
    setIsSoloWinnerAvailable(false);
    startTimer();
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
        className="bg-tail-zinc-50 w-[85%] rounded-2xl p-6 md:max-w-[654px] md:p-14"
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <span className="text-tail-slate-800 text-2xl font-bold md:text-5xl">
            You dit it!
          </span>
          <p className="text-tail-slate-500 text-sm font-bold md:text-lg">
            Game over! Here's how you got on...
          </p>
        </div>
        <div className="mt-6 flex flex-col gap-y-2 md:mt-10 md:gap-y-4">
          <div className="flex w-full items-center justify-between rounded-xl bg-slate-200 p-4 md:px-8 md:py-6">
            <span className="text-tail-slate-500 text-sm font-bold md:text-lg">
              Time Elapsed
            </span>
            <span className="md:text-header2 text-tail-slate-700 text-xl font-bold">
              {time}
            </span>
          </div>
          <div className="flex w-full items-center justify-between rounded-xl bg-slate-200 p-4 md:px-8 md:py-6">
            <span className="text-tail-slate-500 text-sm font-bold md:text-lg">
              Moves Taken
            </span>
            <span className="md:text-header2 text-tail-slate-700 text-xl font-bold">
              {moves} Moves
            </span>
          </div>
        </div>
        <div className="mt-6 flex w-full flex-col gap-y-4 md:mt-14 md:flex-row md:items-center md:gap-x-3.5">
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
            Setup New Game
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SoloWinnerModal;
