import { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/util';
import { useMemoryStore } from '../../store/game-store';
import SoloPlayer from '../SoloPlayer/SoloPlayer';

const GridTiles = () => {
  const {
    gridSize,
    players,
    currentTurn,
    tiles,
    setMatchedTiles,
    matchedTiles,
    noOfplayers,
    moves,
    theme,
    setMoves,
    setTiles,
    setCurrentTurn,
    updatePlayerScore,
  } = useMemoryStore();

  const [clickedTiles, setClickedTiles] = useState<number[]>([]);
  const [disabled, setDisabled] = useState(false);

  const previousTile = useRef<{ index: number; value: number | string } | null>(
    null
  );

  const handleClicks = (value: number | string, index: number) => {
    if (
      disabled ||
      clickedTiles.includes(index) ||
      matchedTiles.includes(index)
    )
      return;

    setClickedTiles((prev) => [...prev, index]);

    if (previousTile.current === null) {
      // First tile
      previousTile.current = { index, value };
    } else {
      // Second tile
      const { index: prevIndex, value: prevValue } = previousTile.current;

      if (prevIndex === index) return; // Prevent clicking the same tile twice

      if (prevValue === value) {
        // Matched
        setMatchedTiles([prevIndex, index]);
        updatePlayerScore(currentTurn, 1);
      }

      // Reset clicked tiles after delay
      setDisabled(true);
      setTimeout(() => {
        setClickedTiles([]);
        previousTile.current = null;
        setDisabled(false);
        const nextTurn = (currentTurn % players.length) + 1;
        setCurrentTurn(nextTurn);
      }, 500);
      setMoves(moves + 1);
    }
  };

  useEffect(() => {
    setTiles(gridSize);
  }, [gridSize, setTiles]);

  return (
    <div className="my-14 flex flex-col md:items-center md:justify-center">
      <div
        className={cn(
          'grid',
          gridSize === 4 && 'grid-cols-4 grid-rows-4 gap-3 md:gap-5',
          gridSize === 6 && 'grid-cols-6 grid-rows-6 gap-2.5 md:gap-4'
        )}
      >
        {tiles.map((tile, index) => {
          const isFlipped =
            clickedTiles.includes(index) || matchedTiles.includes(index);

          return (
            <button
              value={tile}
              onClick={() => handleClicks(tile, index)}
              className={cn(
                'bg-tail-slate-700 text-tail-zinc-50 hover:bg-tail-slate-400 relative flex cursor-pointer items-center justify-center rounded-full font-bold transition-transform duration-300',
                gridSize === 4 &&
                  'md:text-gamenum4 h-[72px] w-[72px] text-4xl md:h-[118px] md:w-[118px]',
                gridSize === 6 &&
                  'md:text-gamenum6 h-[46px] w-[46px] text-2xl md:h-[82px] md:w-[82px]',
                isFlipped && 'bg-tail-slate-300 rotate-x-[360deg]',
                matchedTiles.includes(index) &&
                  'bg-tail-amber-500 cursor-default'
              )}
              key={index}
              disabled={matchedTiles.includes(index)}
            >
              {isFlipped &&
                (theme === 'Icons' ? (
                  <img
                    src={tile as string}
                    alt="icon"
                    className={cn(
                      'object-cover',
                      gridSize === 4 && 'size-8 md:size-14',
                      gridSize === 6 && 'size-5 md:size-10'
                    )}
                  />
                ) : (
                  tile
                ))}
            </button>
          );
        })}
      </div>
      {noOfplayers === 1 && <SoloPlayer />}
    </div>
  );
};
export default GridTiles;
