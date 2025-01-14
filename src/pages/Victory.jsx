import { actionTypes } from '../constants/actionTypes';
import { usePicture } from '../context/PictureContext';
import Button from '../ui/Button';

function Victory() {
  const { dispatch, time, moves, isShowHistory } = usePicture();
  return (
    <div className='finish__wrapper'>
      <h2 className='textVictory'>
        Ура! У тебя получилось открыть все карточки
      </h2>
      {time ? <p>время игры — {time}</p> : 'Время неизвестно'}
      <p>количество ходов — {moves}</p>
      <Button
        onClick={() => dispatch({ type: actionTypes.RESET })}
        className='startBtn'
      >
        Попробовать ещё
      </Button>
      <Button
        onClick={() => dispatch({ type: actionTypes.SHOW_HISTORY })}
        className='startBtn'
      >
        {!isShowHistory ? 'Показать историю партии' : 'Следующий ход'}
      </Button>
    </div>
  );
}

export default Victory;
