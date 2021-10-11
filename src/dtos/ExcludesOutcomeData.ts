export default interface ExcludesOutcomeData {
  question: {
    slug: string;
    label: string;
  };
  answer: {
    slug: string;
    label: string;
  };
  exclude: string[];
}
