/* eslint-disable no-continue */
import initializeListsOfNutraceuticals from './initializeListsOfNutraceuticals';
import combinateNutraceuticals from './combinateNutraceuticals';
import calculateDiscountTax from './calculateDiscountTax';
import suboutcomeAverage from './suboutcomeAverage';
import surpassesHigherLimit from './surpassesHigherLimit';
import surpassesBottomLimit from './surpassesBottomLimit';
import hasNutraceuticalInfluence from './hasNutraceuticalInfluence';

import SuboutcomeData from './dtos/SuboutcomeData';
import InfluenceData from './dtos/InfluenceData';
import CombinationData from './dtos/CombinationData';
import RejectedCombinationsData from './dtos/RejectedCombinationsData';
import NutraceuticalData from './dtos/NutraceuticalData';

interface ResponseData {
  combinations: CombinationData[];
  rejectedCombinations: RejectedCombinationsData[];
}

const calculateCombinations = (
  suboutcomeNutraceuticals: NutraceuticalData[],
  suboutcome: SuboutcomeData,
  level: number,
  influences: InfluenceData[],
): ResponseData => {
  // Initializes lists of nutraceuticals, that groups nutraceuticals by name
  const listOfNutraceuticals = initializeListsOfNutraceuticals(
    suboutcomeNutraceuticals,
  );

  // Gets the amount of unique nutraceuticals (differs by name, not dosage)
  const amountOfUniqueNutraceuticals = listOfNutraceuticals.length;

  // Calculates the number os possible combinations
  const product = listOfNutraceuticals.reduce(
    (total, list) => total * list.length,
    1,
  );

  // Initializes the array that stores the combinations and the one that stores the rejected combinations
  const combinations = [];
  const rejectedCombinations = [];

  /**
   * Runs a iterative backtrack, trying all the possible combinations
   *
   * Each step represents a combination, which is calculated by using the step to reach each nutraceutical index
   * Also, it uses the groups of nutraceuticals as a wheel, that will spin to create different combinations
   *
   * Wheel 0                  Wheel 1                 Wheel 2
   * Nutraceutical1 200mg     Nutraceutical2 200mg    Nutraceutical3 200mg
   * Nutraceutical2 300mg     Nutraceutical2 300mg    Nutraceutical3 300mg
   * Nutraceutical3 400mg                             Nutraceutical3 400mg
   */

  let step: number;

  for (step = 0; step < product; step += 1) {
    // Calculates the current combination
    const { scoreSum, nutraceuticals, combination } = combinateNutraceuticals(
      amountOfUniqueNutraceuticals,
      listOfNutraceuticals,
      step,
    );

    // Calculates the discount tax
    const discountTax = calculateDiscountTax(nutraceuticals, suboutcome, level);

    // Calculates the score of the combination
    const score = scoreSum - scoreSum * discountTax;

    // Calculates the average score of the suboutcome
    const { average, higherLimit, bottomLimit } = suboutcomeAverage(
      suboutcome,
      level,
    );

    // Applies restrictions
    if (surpassesHigherLimit(score, suboutcome, level)) {
      rejectedCombinations.push({
        reason: `Combination score surpasses the higher limit (${score}/${higherLimit})`,
        score,
        distance: Math.abs(average - score),
        amount: nutraceuticals,
        nutraceuticals: combination,
      });
      continue;
    }
    if (surpassesBottomLimit(score, suboutcome, level)) {
      rejectedCombinations.push({
        reason: `Combination score surpasses the bottom limit (${score}/${bottomLimit})`,
        score,
        distance: Math.abs(average - score),
        amount: nutraceuticals,
        nutraceuticals: combination,
      });
      continue;
    }
    if (hasNutraceuticalInfluence(combination, influences)) {
      rejectedCombinations.push({
        reason: `Has nutraceutical influence`,
        score,
        distance: Math.abs(average - score),
        amount: nutraceuticals,
        nutraceuticals: combination,
      });
      continue;
    }

    // If valid, pushes combination into array
    combinations.push({
      score,
      distance: Math.abs(average - score),
      amount: nutraceuticals,
      nutraceuticals: combination,
    });
  }

  return { combinations, rejectedCombinations };
};

export default calculateCombinations;
