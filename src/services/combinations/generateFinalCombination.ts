import CombinationsData from './dtos/CombinationsData';
import NutraceuticalData from './dtos/NutraceuticalData';

const generateFinalCombination = (
  combinationsArray: CombinationsData[],
  amountOfCombinations: number,
  step: number,
): { classification: number; combination: (NutraceuticalData | null)[] } => {
  let classification = 0; // Stores the current final combination classification
  let product = 1; // Stores the current product of possibilities. It is used to calculate the index of the combinations
  let combination: (NutraceuticalData | null)[] = []; // Stores the current final combination

  let i: number;

  // Iterates over all the combinations, generating the current final combination
  for (i = amountOfCombinations - 1; i >= 0; i -= 1) {
    // Gets the amount of combinations in this setting
    const { length } = combinationsArray[i].value;
    // Calculates the index of the current combination
    const index = (step / product) % length;
    // If the combination is not null
    if (combinationsArray[i].value[index] != null) {
      // Concatenates the current combination into the final combination
      combination = combination.concat(
        combinationsArray[i].value[index].nutraceuticals,
      );
    }

    // Sums the current position
    classification += index;
    // Increases the product, which is used to calculate the next index
    product *= length;
  }

  return { classification, combination };
};

export default generateFinalCombination;
