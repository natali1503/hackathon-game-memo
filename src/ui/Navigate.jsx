import { actionTypes } from '../constants/actionTypes';
import { usePicture } from '../context/PictureContext';
import Button from './Button';
import Reset from './Reset';
import { useEffect } from 'react';
import { useStopwatch } from 'react-timer-hook';

function Navigate() {
  const { gameStarted, dispatch, moves, isShowHistory, movesAll } =
    usePicture();
  const { totalSeconds, seconds, minutes, hours, start, pause, reset } =
    useStopwatch({ autoStart: false });
  useEffect(() => {
    dispatch({ type: actionTypes.TIME, payload: t() });
  }, [totalSeconds]);

  useEffect(() => {
    console.log(gameStarted, isShowHistory);
    if (gameStarted && !isShowHistory) {
      start();
    } else {
      reset();
      pause();
    }
  }, [gameStarted, isShowHistory]);

  const t = () => {
    const h = hours < 10 ? '0' + hours : hours;
    const m = minutes < 10 ? '0' + minutes : minutes;
    const s = seconds < 10 ? '0' + seconds : seconds;

    return `${h}:${m}:${s}`;
  };

  return (
    <>
      <div className='main__header'>
        {gameStarted && (
          <div className='turns'>
            {!isShowHistory ? `Ход ${moves}` : `Ход ${moves} из ${movesAll}`}
          </div>
        )}
        {gameStarted && !isShowHistory && <div className='turns'>{t()}</div>}
        {gameStarted && (
          <Reset
            onClick={() => {
              dispatch({ type: actionTypes.RESET });
              reset();
            }}
          />
        )}
        {isShowHistory && (
          <Button
            onClick={() => dispatch({ type: actionTypes.SHOW_HISTORY })}
            className='nextBtn'
          ></Button>
        )}
      </div>
    </>
  );
}

export default Navigate;
