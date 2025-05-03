import { cn } from '../../lib/util';
import { useMemoryStore } from '../../store/game-store';

const SelectTheme = () => {
  const { setSelectTheme, theme } = useMemoryStore();

  return (
    <div>
      <span className="text-tail-slate-400 text-regular font-bold md:text-xl">
        Select Theme
      </span>

      <div className="mt-2.5 flex items-center gap-x-2.5 md:mt-4 md:gap-x-8">
        <button
          onClick={() => setSelectTheme('Numbers')}
          className={cn(
            'bg-tail-slate-300 text-regular text-tail-zinc-50 hover:bg-tail-slate-400 w-full cursor-pointer rounded-full py-2.5 font-bold transition-colors md:px-16 md:text-2xl',
            theme === 'Numbers' && 'bg-tail-slate-700 hover:bg-none'
          )}
        >
          Numbers
        </button>
        <button
          onClick={() => setSelectTheme('Icons')}
          className={cn(
            'bg-tail-slate-300 text-regular text-tail-zinc-50 hover:bg-tail-slate-400 w-full cursor-pointer rounded-full py-2.5 font-bold transition-colors md:px-16 md:text-2xl',
            theme === 'Icons' && 'bg-tail-slate-700'
          )}
        >
          Icons
        </button>
      </div>
    </div>
  );
};

export default SelectTheme;
