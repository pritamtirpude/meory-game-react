import NumberFlow from '@number-flow/react';
import { cn } from '../../lib/util';
import { useMemoryStore } from '../../store/game-store';

const GamePlayers = () => {
  const { players, currentTurn } = useMemoryStore();

  return (
    <div className="flex w-full items-center gap-x-7">
      {players.map((player, index) => (
        <div
          key={index}
          className={cn(
            'relative flex h-[10vh] w-full flex-col md:gap-y-6',
            currentTurn === index + 1 &&
              'after:border-b-tail-amber-500 after:absolute after:-top-4 after:left-1/2 after:-translate-x-1/2 after:border-x-16 after:border-t-0 after:border-b-16 after:border-solid after:border-x-transparent'
          )}
        >
          <div
            className={cn(
              'flex w-full flex-col items-center justify-between rounded-lg bg-slate-200 px-3.5 py-2.5 transition-colors md:flex-row md:px-5 md:py-6',
              currentTurn === index + 1 && 'bg-tail-amber-500'
            )}
          >
            <span
              className={cn(
                'text-tail-slate-400 hidden text-lg font-bold md:block',
                currentTurn === index + 1 && 'text-tail-zinc-50'
              )}
            >
              {player.name}
            </span>
            <span
              className={cn(
                'text-tail-slate-400 block text-sm font-bold md:hidden',
                currentTurn === index + 1 && 'text-tail-zinc-50'
              )}
            >
              {player.shortName}
            </span>
            <span
              className={cn(
                'text-tail-slate-700 text-2xl font-bold md:text-3xl',
                currentTurn === index + 1 && 'text-tail-zinc-50'
              )}
            >
              {/* {player.score} */}
              <NumberFlow value={player.score} />
            </span>
          </div>
          {currentTurn === index + 1 && (
            <span className="text-tail-slate-800 hidden text-center text-xs font-bold tracking-[5px] uppercase md:block">
              Current Turn
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default GamePlayers;
