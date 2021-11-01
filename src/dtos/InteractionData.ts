export default interface InteractionData {
  nutraceutical: string;
  nutraceuticalSlug: string;
  dosage: string;
  dosagesGroup: {
    dosageFrequency: string;
    dosageAmount: string;
  }[];
  dosageUnit: string;
}
