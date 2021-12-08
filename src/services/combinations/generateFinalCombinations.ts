import iterateOverCombinations from './iterateOverCombinations';

import CombinationData from './dtos/CombinationData';
import InfluenceData from './dtos/InfluenceData';
import InteractionData from './dtos/InteractionData';
import SettingData from './dtos/SettingData';
import FinalCombinationsData from './dtos/FinalCombinationsData';
import RejectedCombinationData from './dtos/RejectedCombinationData';

interface ResponseData {
  finalCombinations: FinalCombinationsData[];
  rejectedFinalCombinations: RejectedCombinationData[];
}

const generateFinalCombinations = (
  combinations: Map<number, CombinationData[]>,
  nutraceuticalInfluences: InfluenceData[],
  nutraceuticalInteractionsWithSuboutcomes: InteractionData[],
  settings: SettingData[],
): ResponseData => {
  // Turns combinations map into array
  const combinationsArray = Array.from(combinations, ([name, value]) => ({
    name,
    value,
  }));

  // Filters the desired interactions, matching them with the given settings
  const filteredInteractions = nutraceuticalInteractionsWithSuboutcomes.filter(
    interaction =>
      settings.findIndex(
        element =>
          element.ID === interaction.ID_Suboutcome &&
          element.level === interaction.Nivel,
      ) > -1,
  );

  // Filters the populated combinations
  const filteredCombinations = combinationsArray.filter(
    sub => sub.value.length > 0,
  );

  // Iterates over all the combinations, generating the final combinations
  // eslint-disable-next-line prefer-const
  let { finalCombinations, rejectedFinalCombinations } =
    iterateOverCombinations(
      filteredCombinations,
      nutraceuticalInfluences,
      filteredInteractions,
    );

  // Orders combinations by score
  finalCombinations = finalCombinations.sort((a, b) => {
    // If there is a draw, it uses the amount of nutraceuticals as the parameter
    if (a.finalScore === b.finalScore) {
      return a.nutraceuticals > b.nutraceuticals ? 1 : -1;
    }

    return a.finalScore > b.finalScore ? -1 : 1;
  });

  return { finalCombinations, rejectedFinalCombinations };
};

export default generateFinalCombinations;
