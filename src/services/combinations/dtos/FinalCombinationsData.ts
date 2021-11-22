import NutraceuticalData from './NutraceuticalData';

export default interface FinalCombinationsData {
  nutraceuticals: number;
  finalScore: number;
  classification: number;
  agglutinationScore: number;
  interactionScore: number;
  combination: (NutraceuticalData | null)[];
}
