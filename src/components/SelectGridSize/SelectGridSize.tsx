import { cn } from '../../lib/util';
import { useMemoryStore } from '../../store/game-store';

const SelectGridSize = () => {
  const { setGridSize, gridSize } = useMemoryStore();

  return (
    <div>
      <span className="text-tail-slate-400 text-regular font-bold md:text-xl">
        Grid Size
      </span>

      <div className="mt-4 flex items-center gap-x-2.5 md:gap-x-8">
        <button
          onClick={() => setGridSize(4)}
          className={cn(
            'bg-tail-slate-300 text-regular text-tail-zinc-50 hover:bg-tail-slate-400 w-full cursor-pointer rounded-full py-2.5 font-bold transition-colors md:px-16 md:text-2xl',
            gridSize === 4 && 'bg-tail-slate-700 hover:bg-none'
          )}
        >
          4x4
        </button>
        <button
          onClick={() => setGridSize(6)}
          className={cn(
            'bg-tail-slate-300 text-regular text-tail-zinc-50 hover:bg-tail-slate-400 w-full cursor-pointer rounded-full py-2.5 font-bold transition-colors md:px-16 md:text-2xl',
            gridSize === 6 && 'bg-tail-slate-700'
          )}
        >
          6x6
        </button>
      </div>
    </div>
  );
};

export default SelectGridSize;
