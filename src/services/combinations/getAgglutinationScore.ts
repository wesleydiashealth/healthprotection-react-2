import NutraceuticalData from './dtos/NutraceuticalData';

const getAgglutinationScore = (
  combination: (NutraceuticalData | null)[],
): {
  finalCombination: NutraceuticalData[];
  agglutinationScore: number;
} => {
  const finalCombination: NutraceuticalData[] = []; // Stores the final combination
  let agglutinationScore = 0; // Stores the agglutination score

  // Verifies each item of the combination
  // eslint-disable-next-line consistent-return
  Object.values(combination).forEach(item => {
    // Searches for a nutraceutical with the same name
    const tmpIndex = finalCombination.findIndex(
      element => item?.Nutraceutico === element.Nutraceutico,
    );

    if (!item) {
      return { finalCombination, agglutinationScore };
    }

    // If it is new, pushes into the final combination array
    if (tmpIndex === -1) {
      finalCombination.push(item);
    } else {
      // Gets the nutraceutical
      const tmpItem = finalCombination[tmpIndex];

      // If the dosage of the current nutraceutical is greater than the current one, replaces it with the new one
      if (item.Dosagem > tmpItem.Dosagem) {
        finalCombination[tmpIndex] = item;
      }

      // Sums the agglutination score
      agglutinationScore += item?.Pontuacao_boost || 0;
    }
  });

  // Verifies each item of the combination
  // for (const item of combination) {
  //   // Searches for a nutraceutical with the same name
  //   const tmpIndex = finalCombination.findIndex(
  //     element => item.Nutraceutico == element.Nutraceutico,
  //   );

  //   // If it is new, pushes into the final combination array
  //   if (tmpIndex == -1) {
  //     finalCombination.push(item);
  //   } else {
  //     // Gets the nutraceutical
  //     const tmpItem = finalCombination[tmpIndex];

  //     // If the dosage of the current nutraceutical is greater than the current one, replaces it with the new one
  //     if (item.Dosagem > tmpItem.Dosagem) {
  //       finalCombination[tmpIndex] = item;
  //     }

  //     // Sums the agglutination score
  //     agglutinationScore += item.Pontuacao_boost;
  //   }
  // }

  return { finalCombination, agglutinationScore };
};

export default getAgglutinationScore;
