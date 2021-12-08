import NutraceuticalData from './dtos/NutraceuticalData';

const getAgglutinationScore = (
  combination: (NutraceuticalData | null)[],
): {
  finalCombination: (NutraceuticalData | null)[];
  agglutinationScore: number;
} => {
  const finalCombination: (NutraceuticalData | null)[] = []; // Stores the final combination
  let agglutinationScore = 0; // Stores the agglutination score

  combination.forEach(item => {
    // Searches for a nutraceutical with the same name
    const tmpIndex = finalCombination.findIndex(
      element => item?.Nutraceutico === element?.Nutraceutico,
    );

    if (!item) return;

    // If it is new, pushes into the final combination array
    if (tmpIndex === -1) {
      finalCombination.push(item);
    } else {
      // Gets the nutraceutical
      const tmpItem = finalCombination[tmpIndex];

      // If the dosage of the current nutraceutical is greater than the current one, replaces it with the new one
      if (tmpItem && item.Dosagem > tmpItem.Dosagem) {
        finalCombination[tmpIndex] = item;
      }

      // Sums the agglutination score
      agglutinationScore += item.Pontuacao_boost || 0;
    }
  });

  return { finalCombination, agglutinationScore };
};

export default getAgglutinationScore;
