export function checkVictory(arr) {
  const arrOpenPicture = arr.filter((picture) => {
    return picture.open === false;
  });
  return arrOpenPicture.length === 0;
}
