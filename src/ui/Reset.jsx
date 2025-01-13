import reset from '../assets/icons/refresh.svg';
import Button from './Button';

function Reset({ onClick }) {
  return (
    <Button className='resetBtn' onClick={onClick}>
      <img src={reset} alt={reset} />
    </Button>
  );
}

export default Reset;
