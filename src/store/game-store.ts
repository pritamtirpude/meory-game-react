import { create } from 'zustand';

type ThemeSelectType = 'Numbers' | 'Icons';
type GridSizeType = 4 | 6;

type Player = {
  id: number;
  name: string;
  shortName: string;
  score: number;
};

type MemoryGameType = {
  theme: ThemeSelectType;
  noOfplayers: number;
  players: Player[];
  gridSize: GridSizeType;
  currentTurn: number;
  moves: number;
  tiles: number[] | string[];
  matchedTiles: number[];
  time: string;
  timerInterval: number | null;
  isWinnerAvailable: boolean;
  isSoloWinnerAvailable: boolean;
  isMobileMenuVisible: boolean;
  setSelectTheme: (theme: ThemeSelectType) => void;
  setNoOfPlayers: (numPlayers: number) => void;
  setGridSize: (gridSize: GridSizeType) => void;
  setPlayers: (noOfPlayers: number) => void;
  setCurrentTurn: (playerId: number) => void;
  updatePlayerScore: (playerId: number, score: number) => void;
  setMoves: (move: number) => void;
  setTiles: (gridSize: GridSizeType) => void;
  setMatchedTiles: (indices: number[]) => void;
  setIsWinnerAvailable: (isWinner: boolean) => void;
  setIsSoloWinnerAvailable: (isSoloWinner: boolean) => void;
  setTime: (time: string) => void;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
  restartGameReset: () => void;
  resetAll: () => void;
  setIsMobileMenuVisible: (isMobileMenu: boolean) => void;
};

export const useMemoryStore = create<MemoryGameType>()((set, get) => ({
  theme: 'Numbers',
  players: [],
  noOfplayers: 1,
  gridSize: 4,
  currentTurn: 1,
  moves: 0,
  tiles: [],
  matchedTiles: [],
  time: '0:00',
  timerInterval: null,
  isWinnerAvailable: false,
  isSoloWinnerAvailable: false,
  isMobileMenuVisible: false,
  setSelectTheme: (theme: ThemeSelectType) => set({ theme: theme }),
  setNoOfPlayers: (playerNum: number) => set({ noOfplayers: playerNum }),
  setGridSize: (gridSizeNum: GridSizeType) => set({ gridSize: gridSizeNum }),
  setPlayers: (numPlayers: number) =>
    set({
      players: Array.from({ length: numPlayers }, (_, i) => ({
        id: i + 1,
        name: `Player ${i + 1}`,
        shortName: `P${i + 1}`,
        score: 0,
      })),
    }),
  setTime: (timer: string) => set({ time: timer }),
  setCurrentTurn: (playerId: number) => set({ currentTurn: playerId }),
  updatePlayerScore: (playerId: number, score: number) =>
    set((state) => ({
      players: state.players.map((player) =>
        player.id === playerId
          ? { ...player, score: player.score + score }
          : player
      ),
    })),
  startTimer: () => {
    let totalSeconds = 0;
    const interval = setInterval(() => {
      totalSeconds += 1;
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      set({ time: formattedTime });
    }, 1000);
    set({ timerInterval: interval });
  },

  stopTimer: () => {
    const interval = get().timerInterval;
    if (interval) {
      clearInterval(interval);
      set({ timerInterval: null });
    }
  },
  resetTimer: () => {
    get().stopTimer();
    set({ time: '0:00' });
  },
  setMoves: (move: number) => set({ moves: move }),
  setTiles: (gridSize: GridSizeType) =>
    set((state) => {
      const totalTiles = gridSize * gridSize;
      if (state.theme === 'Icons') {
        const iconPaths = Array.from(
          { length: totalTiles / 2 },
          (_, i) => `/icons/icon-${i + 1}.svg`
        );
        const pairedIcons = [...iconPaths, ...iconPaths];
        return { tiles: pairedIcons.sort(() => Math.random() - 0.5) };
      } else {
        const pairs = Array.from({ length: totalTiles / 2 }, (_, i) => i + 1);
        const pairedNumbers = [...pairs, ...pairs];
        return { tiles: pairedNumbers.sort(() => Math.random() - 0.5) };
      }
    }),
  setMatchedTiles: (indices: number[]) =>
    set((state) => ({ matchedTiles: [...state.matchedTiles, ...indices] })),
  setIsWinnerAvailable: (isWinner: boolean) =>
    set({ isWinnerAvailable: isWinner }),
  setIsSoloWinnerAvailable: (isSoloWinner: boolean) =>
    set({ isSoloWinnerAvailable: isSoloWinner }),
  restartGameReset: () =>
    set((state) => ({
      matchedTiles: [],
      players: state.players.map((player) => ({
        ...player,
        score: 0,
      })),
      currentTurn: 1,
      moves: 0,
      time: '0:00',
      isMobileMenuVisible: false,
    })),
  resetAll: () => {
    set(() => ({
      theme: 'Numbers',
      noOfplayers: 1,
      gridSize: 4,
      tiles: [],
      matchedTiles: [],
      players: [],
      currentTurn: 1,
      moves: 0,
      time: '0:00',
      isWinnerAvailable: false,
      isSoloWinnerAvailable: false,
      isMobileMenuVisible: false,
    }));
  },
  setIsMobileMenuVisible: (isMobileMenu: boolean) =>
    set({ isMobileMenuVisible: isMobileMenu }),
}));
