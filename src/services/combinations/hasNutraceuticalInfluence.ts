import NutraceuticalData from './dtos/NutraceuticalData';
import InfluenceData from './dtos/InfluenceData';

const hasNutraceuticalInfluence = (
  nutraceuticals: (NutraceuticalData | null)[],
  influences: InfluenceData[],
): boolean => {
  // Stores the return flag
  let hasInfluence = false;

  // Iterates over all the nutraceuticals nutraceuticals, searching for a influence match
  nutraceuticals.forEach(nutraceutical => {
    // Verifies if the current nutraceutical is an influencer
    const index = influences.findIndex(
      element =>
        nutraceutical?.Nutraceutico === element.Nutraceutico_influenciador &&
        nutraceutical.Dosagem === element.Dosagem_nutraceutico_influenciador,
    );

    // If the current nutraceutical is an influencer, verifies if there is any influenced nutraceutical
    if (index > -1) {
      // Gets the current influence
      const influence = influences[index];

      // Searches for a match
      const match = nutraceuticals.findIndex(
        element =>
          element?.Nutraceutico === influence.Nutraceutico_influenciado,
      );

      // Updates the return flag
      hasInfluence = match > -1;
    }
  });

  return hasInfluence;
};

export default hasNutraceuticalInfluence;
