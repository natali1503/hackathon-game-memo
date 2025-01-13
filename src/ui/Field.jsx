import Picture from './Picture';

export function Field({ pictureLayout }) {
  return (
    <div className='field'>
      {pictureLayout.map((picture) => (
        <Picture
          key={picture.position}
          position={picture.position}
          open={picture.open}
          img={picture.img}
        ></Picture>
      ))}
    </div>
  );
}
