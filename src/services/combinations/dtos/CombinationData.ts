import NutraceuticalData from './NutraceuticalData';

export default interface CombinationData {
  score: number;
  distance: number;
  amount: number;
  nutraceuticals: (NutraceuticalData | null)[];
}
