import { cn } from '../../lib/util';
import { useMemoryStore } from '../../store/game-store';

const SelectPlayers = () => {
  const { noOfplayers, setNoOfPlayers } = useMemoryStore();

  return (
    <div>
      <span className="text-tail-slate-400 text-regular font-bold md:text-xl">
        Number of Players
      </span>

      <div className="mt-4 flex items-center gap-x-2.5 md:gap-x-5">
        {Array.from({ length: 4 }).map((_, index) => (
          <button
            key={`Player ` + index}
            onClick={() => setNoOfPlayers(index + 1)}
            className={cn(
              'bg-tail-slate-300 text-regular text-tail-zinc-50 hover:bg-tail-slate-400 w-full cursor-pointer rounded-full py-2.5 font-bold transition-colors md:px-11 md:text-2xl',
              noOfplayers === index + 1 && 'bg-tail-slate-700'
            )}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectPlayers;
