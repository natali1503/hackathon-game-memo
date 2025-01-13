import { useEffect } from 'react';
import { usePicture } from '../context/PictureContext';
import Navigate from '../ui/Navigate';
import { actionTypes } from '../constants/actionTypes';
import { Field } from '../ui/Field';

function GamingField() {
  const {
    numberPictureOpen,
    pictureLayout,
    isShowHistory,
    dispatch,
    afterIsShowHistory,
  } = usePicture();
  useEffect(() => {
    if (numberPictureOpen.length < 2 || isShowHistory || afterIsShowHistory)
      return;

    const [firstIndex, secondIndex] = numberPictureOpen;
    const firstPicture = pictureLayout[firstIndex];
    const secondPicture = pictureLayout[secondIndex];

    if (firstPicture.position === secondPicture.position) return;

    if (firstPicture.id === secondPicture.id) {
      dispatch({
        type: actionTypes.PICTURES_MATCHED,
        payload: [firstPicture.position, secondPicture.position],
      });
    } else {
      setTimeout(() => {
        dispatch({
          type: actionTypes.PICTURE_CLOSE,
          payload: [firstPicture.position, secondPicture.position],
        });
      }, 1000);
    }
  }, [
    numberPictureOpen,
    dispatch,
    pictureLayout,
    isShowHistory,
    afterIsShowHistory
  ]);

  return (
    <main>
      <div className='wrapper'>
        <div className='main__wrapper'>
          <Navigate />
          <Field pictureLayout={pictureLayout} />
        </div>
      </div>
    </main>
  );
}

export default GamingField;
