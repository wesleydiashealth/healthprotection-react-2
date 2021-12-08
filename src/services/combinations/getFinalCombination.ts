import formatCombination from './formatCombination';

import SuboutcomeData from './dtos/SuboutcomeData';
import OutcomeData from './dtos/OutcomeData';
import agglutinateCombination from './agglutinateCombination';
import FinalCombinationData from './dtos/FinalCombinationData';
import FinalCombinationsData from './dtos/FinalCombinationsData';

const getFinalCombination = (
  finalCombinations: FinalCombinationsData[],
  suboutcomes: SuboutcomeData[],
  outcomes: OutcomeData[],
): FinalCombinationData => {
  // Gets the combination array
  const { combination } = finalCombinations[0];

  // Agglutinates the combination
  const agglutinatedCombination = agglutinateCombination(combination);

  // Formats the final combination
  const formattedFinalCombination = formatCombination(
    agglutinatedCombination,
    suboutcomes,
    outcomes,
  );

  return formattedFinalCombination;
};

export default getFinalCombination;
