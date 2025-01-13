import { actionTypes } from '../constants/actionTypes';
import { usePicture } from '../context/PictureContext';
import Button from '../ui/Button';

function StartGame() {
  const { dispatch } = usePicture();
  return (
    <div className='startWrapper'>
      <Button
        className='startBtn'
        onClick={() => dispatch({ type: actionTypes.START_GAME })}
      >
        Начать игру
      </Button>
      <h2>
        Открывай по очереди карточки, запоминай какие зверюшки там появляются и
        найди всех повторяющихся
      </h2>
    </div>
  );
}

export default StartGame;
