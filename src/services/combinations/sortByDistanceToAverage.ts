import CombinationData from './dtos/CombinationData';

const sortByDistanceToAverage = (
  a: CombinationData,
  b: CombinationData,
  level: number,
): number => {
  // If distance to ideal score is equal, uses score as tiebreaker
  if (a.distance === b.distance) {
    return a.score < b.score ? 1 : -1;
  }

  // If not using max level, orders by distante to ideal score ascending, or else, orders descending
  return a.distance < b.distance !== level >= 3 ? -1 : 1;
};

export default sortByDistanceToAverage;
