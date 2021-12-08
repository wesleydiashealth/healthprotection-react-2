import SuboutcomeData from './dtos/SuboutcomeData';
import OutcomeData from './dtos/OutcomeData';
import NutraceuticalData from './dtos/NutraceuticalData';
import FinalCombinationData from './dtos/FinalCombinationData';

const formatCombination = (
  combination: (NutraceuticalData | null)[],
  suboutcomes: SuboutcomeData[],
  outcomes: OutcomeData[],
): FinalCombinationData => {
  // Stores the formatted combination
  const formattedCombination: FinalCombinationData = {};

  // Iterates over the combination
  combination.forEach(nutraceutical => {
    // Gets suboutcome's slug
    const suboutcome =
      suboutcomes[
        suboutcomes.findIndex(
          item => item.Nome === nutraceutical?.Nome_Suboutcome,
        )
      ];
    const slugSuboutcome = suboutcome.Slug;
    // Gets outcome's slug
    const slugOutcome =
      outcomes[
        outcomes.findIndex(item => item.Nome === suboutcome.Nome_outcome)
      ].Slug;

    // Initializes the keys in the formatted object
    if (!formattedCombination[slugOutcome])
      formattedCombination[slugOutcome] = {};
    if (!formattedCombination[slugOutcome][slugSuboutcome])
      formattedCombination[slugOutcome][slugSuboutcome] = [];

    // Pushes the current nutraceutical into the formatted combination
    formattedCombination[slugOutcome][slugSuboutcome].push({
      Nutraceutical: nutraceutical?.Slug || '',
      Dosage: nutraceutical?.Dosagem || 0,
    });
  });

  return formattedCombination;
};

export default formatCombination;
