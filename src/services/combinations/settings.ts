// Initializes the settings object, which stores the final equation weights
const weightSettings = {
  // Weights for the SGBD level queries
  queryWeights: {
    levelOfEvidenceWeight: 1, // Weight for the level of evidence
    efficiencyWeight: 1, // Weight for the efficiency level
    consistencyOfResearchResultsWeight: 1, // Weight for the consistency of research results
    efficiencyDependencyDosage: 1, // Weight for the efficiency dependency dosage
    subjectiveScore: 1, // Weight for the subjective score
  },

  // Options for the discount tax equation
  discountTaxEquation: {
    options: ['Exponential', 'Linear'], // Available methods
    selected: 'Linear', // Current selected method
  },

  // Weights for the final equation
  finalEquation: {
    agglutinationWeight: 0.1, // Weight for agglutination score
    amountOfNutraceuticalsWeight: 0, // Weight for amount of nutraceuticals
    idealScoreWeight: 1, // Weight for classification by distance to ideal suboutcome score
    interactionWeight: 1, // Weight for the negative interaction between nutraceuticals and suboutcomes
  },
};

export default weightSettings;
