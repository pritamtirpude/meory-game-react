import { useEffect } from 'react';
import { useMemoryStore } from '../../store/game-store';

const SoloPlayer = () => {
  const { moves, tiles, matchedTiles, time, startTimer, stopTimer } =
    useMemoryStore();

  useEffect(() => {
    startTimer();

    return () => {
      stopTimer();
    };
  }, [startTimer, stopTimer]);

  useEffect(() => {
    if (tiles.length > 0 && tiles.length === matchedTiles.length) {
      stopTimer();
    }
  }, [tiles, matchedTiles, stopTimer]);

  return (
    <div className="mt-14 flex w-full items-center gap-x-7">
      <div className="flex w-full flex-col items-center justify-between rounded-lg bg-slate-200 px-3.5 py-2.5 md:flex-row md:px-5 md:py-6">
        <span className="text-tail-slate-400 hidden text-lg font-bold md:block">
          Time
        </span>
        <span className="text-tail-slate-700 w-14 text-2xl font-bold md:text-3xl">
          {time}
        </span>
      </div>

      <div className="flex w-full flex-col items-center justify-between rounded-lg bg-slate-200 px-3.5 py-2.5 md:flex-row md:px-5 md:py-6">
        <span className="text-tail-slate-400 hidden text-lg font-bold md:block">
          Moves
        </span>
        <span className="text-tail-slate-700 text-2xl font-bold md:text-3xl">
          {moves}
        </span>
      </div>
    </div>
  );
};

export default SoloPlayer;
