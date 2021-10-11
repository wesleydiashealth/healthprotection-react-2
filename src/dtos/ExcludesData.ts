import ExcludesOutcomeData from 'dtos/ExcludesOutcomeData';

export default interface ExcludesData {
  outcomes: ExcludesOutcomeData[];
  suboutcomes: ExcludesOutcomeData[];
  nutraceuticals: {
    medication: {
      slug: string;
      title: string;
      exclude: string[];
    };
  }[];
}
