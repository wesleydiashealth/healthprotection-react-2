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
  combinations: Map<number, CombinationData>,
  nutraceuticalInfluences: InfluenceData[],
  nutraceuticalInteractionsWithSuboutcomes: InteractionData[],
  settings: SettingData[],
): ResponseData => {
  // Turns combinations map into array
  // const combinationsArray = Array.from(combinations, ([name, value]) => ({
  //   name,
  //   value,
  // }));

  // Filters the desired interactions, matching them with the given settings
  const filteredInteractions = nutraceuticalInteractionsWithSuboutcomes.filter(
    interaction =>
      settings.findIndex(
        setting =>
          setting.ID === interaction.ID_Suboutcome &&
          setting.level === interaction.Nivel,
      ) > -1,
  );

  // Filters the populated combinations
  const filteredCombinations = Object.values(combinations).filter(
    filteredCombination => filteredCombination.value.length > 0,
  );

  // Iterates over all the combinations, generating the final combinations
  // Iterates over all the combinations, generating the final combinations
  const { finalCombinations, rejectedFinalCombinations } =
    iterateOverCombinations(
      filteredCombinations,
      nutraceuticalInfluences,
      filteredInteractions,
    );

  // Orders combinations by score
  finalCombinations.sort((a, b) => {
    // If there is a draw, it uses the amount of nutraceuticals as the parameter
    if (a.finalScore === b.finalScore) {
      return a.nutraceuticals > b.nutraceuticals ? 1 : -1;
    }

    return a.finalScore > b.finalScore ? -1 : 1;
  });

  // fs.writeFile(
  //   './outputs/2_Combinations.json',
  //   JSON.stringify(combinationsArray, null, 2),
  //   () => {},
  // );
  // fs.writeFile(
  //   './outputs/3_FinalCombinations.json',
  //   JSON.stringify(finalCombinations, null, 2),
  //   () => {},
  // );

  return { finalCombinations, rejectedFinalCombinations };
};

export default generateFinalCombinations;
