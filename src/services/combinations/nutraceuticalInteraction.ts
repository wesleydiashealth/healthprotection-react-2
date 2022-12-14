import InteractionData from './dtos/InteractionData';
import NutraceuticalData from './dtos/NutraceuticalData';

const nutraceuticalInteraction = (
  nutraceuticals: (NutraceuticalData | null)[],
  nutraceuticalInteractionsWithSuboutcomes: InteractionData[],
): number | string => {
  // Stores the return value
  let interactionScore: number | string = 0;
  let disqualified = false;

  // Iterates over the nutraceuticals, searching for negative interactions
  nutraceuticals.some(nutraceutical => {
    // Searches for interaction matches
    const interactions = nutraceuticalInteractionsWithSuboutcomes.filter(
      element => nutraceutical?.ID_Nutraceutico === element.ID_Nutraceutico,
    );

    // Iterates over the filtered interactions, updating the final result
    interactions.some(interaction => {
      // If the interaction is an exclusion one, stops the searching
      if (interaction.Interacao === 'DESCLASSIFICAR') {
        disqualified = true;
        return true;

        // Or else, sums the current score to the final interaction score
      }

      if (typeof interactionScore === 'number') {
        interactionScore += parseInt(interaction.Interacao, 10);
      }

      return false;
    });

    // If the interaction found an exclusion one, stops the searching
    if (disqualified) return true;

    return false;
  });

  return interactionScore;
};

export default nutraceuticalInteraction;
