import StartGame from './pages/StartGame';
import GamingField from './pages/GamingField';
import Victory from './pages/Victory';
import { usePicture } from './context/PictureContext';

function App() {
  const { startGame, isGame, isVictory } = usePicture();

  return (
    <>
      {startGame && <StartGame />}
      {isGame && <GamingField />}
      {isVictory && <Victory />}
    </>
  );
}

export default App;
