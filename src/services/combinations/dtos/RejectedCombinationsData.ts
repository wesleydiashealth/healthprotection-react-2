import NutraceuticalData from './NutraceuticalData';

export default interface RejectedCombinationsData {
  reason: string;
  score: number;
  distance: number;
  amount: number;
  nutraceuticals: (NutraceuticalData | null)[];
}
