export function changeStatusPicture(arrPicture, arrPicturePositions) {
  const newArrPicture = arrPicture.map((picture) => {
    if (arrPicturePositions.includes(picture.position))
      return { ...picture, open: !picture.open };
    else return picture;
  });
  return newArrPicture;
}
