import { imagePaths } from '../constants/imagePaths';
import { createRandomArray } from './createRandomArray';

function createTemplData(randomArray, imagePaths) {
  const templData = [];

  for (let i = 0; i < randomArray.length; i++) {
    const id = randomArray[i];
    const position = i;
    const img = imagePaths[id];

    templData.push({ id, position, img, open: false });
  }

  return templData;
}

export function randomArrPicture() {
  return createTemplData(createRandomArray(), imagePaths);
}
