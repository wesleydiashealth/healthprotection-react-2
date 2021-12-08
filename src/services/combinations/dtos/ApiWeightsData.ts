export default interface ApiWeightsData {
  result: {
    queryWeights: {
      levelOfEvidenceWeight: number;
      efficiencyWeight: number;
      consistencyOfResearchResultsWeight: number;
      efficiencyDependencyDosage: number;
      subjectiveScore: number;
    };
    discountTaxEquation: {
      options: string[];
      selected: string;
    };
    finalEquation: {
      agglutinationWeight: number;
      amountOfNutraceuticalsWeight: number;
      idealScoreWeight: number;
      interactionWeight: number;
    };
  };
}
