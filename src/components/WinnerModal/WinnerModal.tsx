import { useNavigate } from 'react-router';
import { cn } from '../../lib/util';
import { useMemoryStore } from '../../store/game-store';

const WinnerModal = () => {
  const {
    players,
    restartGameReset,
    gridSize,
    setTiles,
    setIsWinnerAvailable,
    resetAll,
  } = useMemoryStore();

  const navigate = useNavigate();

  const winnersSortedList = [...players].sort((a, b) => b.score - a.score);

  const highestScore = winnersSortedList[0]?.score;

  const tieWinners = winnersSortedList.filter(
    (player) => player.score === highestScore
  );

  const handleRestart = () => {
    restartGameReset();
    setTiles(gridSize);
    setIsWinnerAvailable(false);
  };

  const hanldeNewGameReset = () => {
    navigate('/');
    resetAll();
  };

  return (
    <div className="fixed flex size-full min-h-screen flex-col items-center justify-center bg-black/75">
      <div className="bg-tail-zinc-50 w-[85%] rounded-2xl p-6 md:max-w-[654px] md:p-14">
        <div className="flex flex-col items-center justify-center gap-4">
          <span className="text-tail-slate-800 text-2xl font-bold md:text-5xl">
            {tieWinners.length > 1
              ? 'Its a Tie!'
              : `${winnersSortedList[0]?.name} Wins!`}
          </span>
          <p className="text-tail-slate-500 text-sm font-bold md:text-lg">
            Game over! Here are the results...
          </p>
        </div>
        <div className="mt-6 flex flex-col gap-y-2 md:mt-10 md:gap-y-4">
          {winnersSortedList.map((winner) => {
            const activeIndex = winner.score === highestScore;
            return (
              <div
                className={cn(
                  'flex w-full items-center justify-between rounded-xl bg-slate-200 p-4 md:px-8 md:py-6',
                  activeIndex && 'bg-tail-slate-800'
                )}
                key={winner.id}
              >
                <span
                  className={cn(
                    'text-tail-slate-500 text-sm font-bold md:text-lg',
                    activeIndex && 'text-tail-zinc-50'
                  )}
                >
                  {highestScore === winner.score
                    ? `${winner.name} (Winner!)`
                    : winner.name}
                </span>
                <span
                  className={cn(
                    'md:text-header2 text-tail-slate-700 text-xl font-bold',
                    activeIndex && 'text-tail-zinc-50'
                  )}
                >
                  {winner.score} Pairs
                </span>
              </div>
            );
          })}
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
      </div>
    </div>
  );
};

export default WinnerModal;
