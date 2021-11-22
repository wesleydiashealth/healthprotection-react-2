import NutraceuticalData from './NutraceuticalData';

export default interface RejectedCombinationData {
  reason: string;
  nutraceuticals: number;
  finalScore: number;
  classification: number;
  agglutinationScore: number;
  interactionScore: number;
  combination: (NutraceuticalData | null)[];
}
