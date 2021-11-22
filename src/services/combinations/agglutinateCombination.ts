import NutraceuticalData from './dtos/NutraceuticalData';

const agglutinateCombination = (
  combination: (NutraceuticalData | null)[],
): (NutraceuticalData | null)[] => {
  // Stores the agglutinated combination
  let agglutinatedCombination: NutraceuticalData[] = [];

  // Sorts the combination by name and dosage
  const orderedCombination = combination.sort((a, b) => {
    if (!a?.Dosagem || !b?.Dosagem) return 1;

    // If there is a draw, uses the dosage as the parameter
    if (a?.Nutraceutico === b?.Nutraceutico) {
      return a.Dosagem < b.Dosagem ? 1 : -1;
    }

    return a.Nutraceutico > b.Nutraceutico ? 1 : -1;
  });

  // Stores the last nutraceutical
  let lastNutraceutical: NutraceuticalData | null;

  // Iterates over the ordered combination
  orderedCombination.forEach(nutraceutical => {
    if (!nutraceutical) return;

    // If it is the second+ nutraceutical with the same name, uses the higher dosage
    if (
      nutraceutical?.Nutraceutico === lastNutraceutical?.Nutraceutico &&
      nutraceutical.Dosagem < lastNutraceutical.Dosagem
    ) {
      agglutinatedCombination = [
        ...agglutinatedCombination,
        {
          Nutraceutico: nutraceutical.Nutraceutico,
          Slug: nutraceutical.Slug,
          Dosagem: lastNutraceutical.Dosagem,
          Nome_Suboutcome: nutraceutical.Nome_Suboutcome,
        },
      ];

      // Or else, if it is the first of the nutraceuticals, pushes it into the agglutinated combination
    } else if (
      nutraceutical?.Nutraceutico !== lastNutraceutical?.Nutraceutico
    ) {
      agglutinatedCombination.push({
        Nutraceutico: nutraceutical.Nutraceutico,
        Slug: nutraceutical.Slug,
        Dosagem: nutraceutical.Dosagem,
        Nome_Suboutcome: nutraceutical.Nome_Suboutcome,
      });

      lastNutraceutical = nutraceutical;
    }
  });

  return agglutinatedCombination;
};

export default agglutinateCombination;
