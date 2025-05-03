import { useNavigate } from 'react-router';
import { useMemoryStore } from '../../store/game-store';
import SelectGridSize from '../SelectGridSize/SelectGridSize';
import SelectPlayers from '../SelectPlayers/SelectPlayers';
import SelectTheme from '../SelectTheme/SelectTheme';

const GameChoiceSelector = () => {
  const navigate = useNavigate();
  const { setPlayers, noOfplayers } = useMemoryStore();

  const handleNavigation = () => {
    setPlayers(noOfplayers);
    navigate('/memory');
  };

  return (
    <div className="bg-tail-slate-800 flex min-h-screen flex-col items-center justify-center gap-y-11 px-6 md:gap-y-16 md:px-0">
      <h1 className="text-title text-tail-zinc-50 font-bold">memory</h1>

      <div className="bg-tail-zinc-50 flex w-full flex-col gap-y-6 rounded-2xl p-6 md:max-w-[664px] md:gap-y-8 md:p-14">
        <SelectTheme />
        <SelectPlayers />
        <SelectGridSize />
        <button
          onClick={handleNavigation}
          className="bg-tail-amber-500 md:text-header2 w-full cursor-pointer rounded-full py-3.5 text-lg font-bold text-white hover:opacity-80"
        >
          Start Game
        </button>
      </div>
    </div>
  );
};

export default GameChoiceSelector;
