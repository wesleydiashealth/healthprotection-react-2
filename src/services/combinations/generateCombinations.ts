import calculateCombinations from './calculateCombinations';
import sortByDistanceToAverage from './sortByDistanceToAverage';

import NutraceuticalData from './dtos/NutraceuticalData';
import SuboutcomeData from './dtos/SuboutcomeData';
import InfluenceData from './dtos/InfluenceData';
import CombinationData from './dtos/CombinationData';
import RejectedCombinationsData from './dtos/RejectedCombinationsData';

interface ResponseData {
  combinations: CombinationData[];
  rejectedCombinations: RejectedCombinationsData[];
}

const generateCombinations = (
  nutraceuticals: NutraceuticalData[],
  suboutcome: SuboutcomeData,
  level: number,
  influences: InfluenceData[],
): ResponseData | undefined => {
  // Verifies if the level is equal or greater than min
  if (level <= 0) return;

  // Gets current suboutcome nutraceuticals
  const suboutcomeNutraceuticals = nutraceuticals.filter(
    nutraceutical => nutraceutical.ID_Suboutcome === suboutcome.ID,
  );

  // Calculates all the possible combinations
  // eslint-disable-next-line prefer-const
  let { combinations, rejectedCombinations } = calculateCombinations(
    suboutcomeNutraceuticals,
    suboutcome,
    level,
    influences,
  );

  // Orders combinations by distance to ideal score and uses score as tiebreaker
  combinations = combinations.sort((a, b) =>
    sortByDistanceToAverage(a, b, level),
  );

  // eslint-disable-next-line consistent-return
  return { combinations, rejectedCombinations };
};

export default generateCombinations;
