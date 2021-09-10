export default interface SuboutcomeData {
  id: string;
  title: string;
  description: string;
  nutraceuticals: {
    min: string[];
    med: string[];
    max: string[];
  };
}
