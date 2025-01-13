import { generateRandomNumber } from './generateRandomNumber';

export function createRandomArray() {
  const numbersCount = {};
  const resultArray = [];

  for (let i = 0; i < 16; i++) {
    let randomNumber = generateRandomNumber();
    while (randomNumber === resultArray[i - 1]) {
      randomNumber = generateRandomNumber();
    }
    while (numbersCount[randomNumber] >= 2) {
      randomNumber = generateRandomNumber();
    }

    while (resultArray.filter((num) => num === randomNumber).length >= 2) {
      randomNumber = generateRandomNumber();
    }

    resultArray.push(randomNumber);
    numbersCount[randomNumber] = (numbersCount[randomNumber] || 0) + 1;
  }

  return resultArray;
}
