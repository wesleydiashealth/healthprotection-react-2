import NutraceuticalData from './dtos/NutraceuticalData';

const compareByName = (a: NutraceuticalData, b: NutraceuticalData): number => {
  return a.Nutraceutico < b.Nutraceutico ? 1 : -1;
};

export default compareByName;
