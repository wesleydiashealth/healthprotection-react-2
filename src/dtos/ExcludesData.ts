export default interface ExcludesData {
  outcomes: {
    [question: string]: {
      [answer: string]: string[];
    };
  };
  // eslint-disable-next-line camelcase
  sub_outcomes: {
    [question: string]: {
      [answer: string]: string[];
    };
  };
}
