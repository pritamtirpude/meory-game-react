import { AnimatePresence } from 'motion/react';
import { useEffect } from 'react';
import { useMemoryStore } from '../../store/game-store';
import GameHeader from '../GameHeader/GameHeader';
import GamePlayers from '../GamePlayers/GamePlayers';
import GridTiles from '../GridTiles/GridTiles';
import MobileMenuModal from '../MobileMenuModal/MobileMenuModal';
import SoloWinnerModal from '../SoloWinnerModal/SoloWinnerModal';
import WinnerModal from '../WinnerModal/WinnerModal';

const MemoryGame = () => {
  const {
    noOfplayers,
    tiles,
    matchedTiles,
    setIsWinnerAvailable,
    isWinnerAvailable,
    isMobileMenuVisible,
    isSoloWinnerAvailable,
    setIsSoloWinnerAvailable,
  } = useMemoryStore();

  useEffect(() => {
    if (
      tiles.length > 0 &&
      tiles.length === matchedTiles.length &&
      noOfplayers > 1
    ) {
      setIsWinnerAvailable(true);
    }
  }, [tiles.length, matchedTiles.length, setIsWinnerAvailable, noOfplayers]);

  useEffect(() => {
    if (
      tiles.length > 0 &&
      tiles.length === matchedTiles.length &&
      noOfplayers === 1
    ) {
      setIsSoloWinnerAvailable(true);
    }
  }, [
    tiles.length,
    matchedTiles.length,
    setIsSoloWinnerAvailable,
    noOfplayers,
  ]);

  return (
    <div className="bg-tail-zinc-50 relative flex min-h-screen w-full flex-col items-center justify-center p-6 md:mx-auto md:max-w-6xl">
      <GameHeader />
      <GridTiles />
      {noOfplayers > 1 && <GamePlayers />}

      <AnimatePresence mode="wait" initial={false}>
        {isWinnerAvailable && <WinnerModal />}
      </AnimatePresence>

      <AnimatePresence mode="wait" initial={false}>
        {isSoloWinnerAvailable && <SoloWinnerModal />}
      </AnimatePresence>

      <AnimatePresence mode="wait" initial={false}>
        {isMobileMenuVisible && <MobileMenuModal />}
      </AnimatePresence>
    </div>
  );
};

export default MemoryGame;
