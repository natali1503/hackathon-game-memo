import { generateRandomNumber } from './generateRandomNumber';

export function createRandomArray(arrayLength = 16, maxOccurrences = 2) {
  const numbersCount = {};
  const resultArray = [];
  let attempts = 0;
  const maxAttempts = 1000;

  while (resultArray.length < arrayLength) {
    if (attempts++ > maxAttempts) {
      throw new Error('Unable to generate array within constraints');
    }

    const randomNumber = generateRandomNumber();
    const previousNumber = resultArray[resultArray.length - 1];
    const currentCount = numbersCount[randomNumber] || 0;

    if (currentCount < maxOccurrences && randomNumber !== previousNumber) {
      resultArray.push(randomNumber);
      numbersCount[randomNumber] = currentCount + 1;
    }
  }
  return resultArray;
}
