import { actionTypes } from '../constants/actionTypes';
import { usePicture } from '../context/PictureContext';
import CardСover from './CardCover';

function Picture({ position, open, img }) {
  const { dispatch } = usePicture();
  return open ? (
    <div className='cell active' key={position}>
      <img src={img} className='pictureImg' alt=''></img>
    </div>
  ) : (
    <CardСover
      onClick={() => {
        dispatch({ type: actionTypes.PICTURE_OPEN, payload: [position] });
      }}
      key={position}
    />
  );
}

export default Picture;
