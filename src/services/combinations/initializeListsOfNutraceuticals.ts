import compareByName from './compareByName';

import NutraceuticalData from './dtos/NutraceuticalData';

const initializeListsOfNutraceuticals = (
  nutraceuticals: NutraceuticalData[],
): (NutraceuticalData | null)[][] => {
  // Orders nutraceuticals by name
  const orderedNutraceuticals = nutraceuticals.sort(compareByName);

  const listOfNutraceuticals: (NutraceuticalData | null)[][] = []; // Stores the list of nutraceuticals
  let lastNutraceutical = ''; // Stores the name of the last nutraceutical
  let currentList: (NutraceuticalData | null)[] = []; // Stores the current list of nutraeuticals

  // Iterates over the list of nutraceuticals
  orderedNutraceuticals.forEach((nutraceutical, index) => {
    // If the current nutraceutical name is different of the last one, initializes a new list
    if (nutraceutical.Nutraceutico !== lastNutraceutical) {
      // If the current nutraceutical is not the last one, pushes the current list into the list of nutraceuticals
      if (lastNutraceutical !== '') listOfNutraceuticals.push(currentList);

      // Resets the current list
      currentList = [];

      // If not supercore, pushes a null initial element to the next list to grant a combination without this nutraceutical
      if (nutraceutical.Importancia !== 'SUPERCORE') currentList.push(null);
    }

    // Pushes the nutraceutical into the current list
    currentList.push(nutraceutical);

    // Sets the last nutraeutical as the current one
    lastNutraceutical = nutraceutical.Nutraceutico;

    // If it is the last element, pushes the current list into the list of nutraceuticals
    if (index === orderedNutraceuticals.length - 1)
      listOfNutraceuticals.push(currentList);
  });

  return listOfNutraceuticals;
};

export default initializeListsOfNutraceuticals;
