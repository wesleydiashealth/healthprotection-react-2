import NutraceuticalData from './dtos/NutraceuticalData';

interface ResponseData {
  scoreSum: number;
  nutraceuticals: number;
  combination: (NutraceuticalData | null)[];
}

const combinateNutraceuticals = (
  amountOfUniqueNutraceuticals: number,
  listOfNutraceuticals: (NutraceuticalData | null)[][],
  step: number,
): ResponseData => {
  let scoreSum = 0; // Stores the sum of the nutraceuticals scores
  let product = 1; // Stores the current product of possibilities. It is used to calculate the index of the nutraceuticals
  let nutraceuticals = 0; // Stores the amount of nutraceuticals in the current combination
  let combination: (NutraceuticalData | null)[] = []; // Stores the current combination

  let i: number;

  // Iterates over the current combination nutraceuticals
  for (i = amountOfUniqueNutraceuticals - 1; i >= 0; i -= 1) {
    // Gets the amount of equal nutraceuticals (that differ by dosage)
    const { length } = listOfNutraceuticals[i];

    // Calculates the index of the selected nutraceutical
    const index = (step / product) % length;

    // If nutraceutical is not null
    if (listOfNutraceuticals[i][index] !== null) {
      // Pushes it into the combination
      // combination.push(listOfNutraceuticals[i][index]);
      combination = [...combination, listOfNutraceuticals[i][index]];

      // Adds the score to the sum
      scoreSum += listOfNutraceuticals[i][index]?.Score || 0;

      // Counts the new nutraceutical
      nutraceuticals += 1;
    }

    // Increases the product, which is used to calculate the next index
    product *= length;
  }

  return { scoreSum, nutraceuticals, combination };
};

export default combinateNutraceuticals;
