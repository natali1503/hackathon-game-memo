export function changeStatusPicture(arrPicture, arrPos) {
  const newArrPicture = arrPicture.map((picture) => {
    if (picture.position === arrPos[0] || picture.position === arrPos[1])
      return { ...picture, open: !picture.open };
    else return picture;
  });
  return newArrPicture;
}
