import generateFinalCombination from './generateFinalCombination';
import nutraceuticalInteraction from './nutraceuticalInteraction';
import getAgglutinationScore from './getAgglutinationScore';
import hasNutraceuticalInfluence from './hasNutraceuticalInfluence';
import FinalCombinationsData from './dtos/FinalCombinationsData';
import RejectedCombinationData from './dtos/RejectedCombinationData';

import weightSettings from './settings';

import CombinationsData from './dtos/CombinationsData';
import InfluenceData from './dtos/InfluenceData';
import InteractionData from './dtos/InteractionData';

interface ResponseData {
  finalCombinations: FinalCombinationsData[];
  rejectedFinalCombinations: RejectedCombinationData[];
}

const iterateOverCombinations = (
  combinations: CombinationsData[],
  nutraceuticalInfluences: InfluenceData[],
  nutraceuticalInteractionsWithSuboutcomes: InteractionData[],
): ResponseData => {
  // Initializes the final combinations array
  const finalCombinations: FinalCombinationsData[] = [];
  const rejectedFinalCombinations: RejectedCombinationData[] = [];

  // Gets the amount of combinations
  const amountOfCombinations = combinations.length;

  // Gets the number of possible final combinations
  const product = combinations.reduce(
    (total, list) => total * list.value.length,
    1,
  );

  let step: number;

  // Uses a iterative backtraking to generate all the final combinations
  for (step = 0; step < product; step += 1) {
    // Generates the final combination for the current step
    const { classification, combination } = generateFinalCombination(
      combinations,
      amountOfCombinations,
      step,
    );

    // Searches for interactions with the other suboutcomes
    const interactionScore = nutraceuticalInteraction(
      combination,
      nutraceuticalInteractionsWithSuboutcomes,
    );

    // Agglutinates the combination
    const { finalCombination, agglutinationScore } =
      getAgglutinationScore(combination);

    // Calculates the final score, using agglutination score and classification as parameters
    const finalScore =
      (1 +
        weightSettings.finalEquation.interactionWeight * interactionScore +
        weightSettings.finalEquation.agglutinationWeight * agglutinationScore) /
      (1 +
        weightSettings.finalEquation.amountOfNutraceuticalsWeight *
          finalCombination.length +
        weightSettings.finalEquation.idealScoreWeight * classification);

    // Applies restrictions
    if (hasNutraceuticalInfluence(combination, nutraceuticalInfluences)) {
      rejectedFinalCombinations.push({
        reason: `Has nutraceutical influence`,
        nutraceuticals: finalCombination.length,
        finalScore,
        classification,
        agglutinationScore,
        interactionScore,
        combination,
      });
    }

    // If there is a invalid interaction, removes the current combination
    if (interactionScore === 0) {
      rejectedFinalCombinations.push({
        reason: `Has suboutcome negative interaction`,
        nutraceuticals: finalCombination.length,
        finalScore,
        classification,
        agglutinationScore,
        interactionScore,
        combination,
      });
    }

    // Pushes the combinations into the final combinations array
    finalCombinations.push({
      nutraceuticals: finalCombination.length,
      finalScore,
      classification,
      agglutinationScore,
      interactionScore,
      combination,
    });
  }

  return { finalCombinations, rejectedFinalCombinations };
};

export default iterateOverCombinations;
