export default interface FinalCombinationData {
  [key: string]: {
    [key: string]: {
      Nutraceutical: string;
      Dosage: number;
    }[];
  };
}
