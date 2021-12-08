import NutraceuticalData from './NutraceuticalData';

export default interface FinalCombinationsData {
  nutraceuticals: number;
  finalScore: number | string;
  classification: number;
  agglutinationScore: number;
  interactionScore: number | string;
  combination: (NutraceuticalData | null)[];
}
