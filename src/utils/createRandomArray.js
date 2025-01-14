import { generateRandomNumber } from './generateRandomNumber';

export function createRandomArray() {
  const numbersCount = {};
  const resultArray = [];
  const maxOccurrences = 2;

  while (resultArray.length < 16) {
    const randomNumber = generateRandomNumber();
    const previousNumber = resultArray[resultArray.length - 1];
    const currentCountNumber = numbersCount[randomNumber] || 0;

    if (
      currentCountNumber < maxOccurrences &&
      randomNumber !== previousNumber
    ) {
      resultArray.push(randomNumber);
      numbersCount[randomNumber] = currentCountNumber + 1;
    }
  }

  return resultArray;
}
