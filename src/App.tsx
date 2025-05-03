import { Route, Routes } from 'react-router';
import GameChoiceSelector from './components/GameChoiceSelector/GameChoiceSelector';
import MemoryGame from './components/MemoryGame/MemoryGame';

const App = () => {
  return (
    <main>
      <Routes>
        <Route element={<GameChoiceSelector />} path="/" index />
        <Route element={<MemoryGame />} path="/memory" />
      </Routes>
    </main>
  );
};

export default App;
