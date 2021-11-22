import SuboutcomeData from './dtos/SuboutcomeData';

const surpassesHigherLimit = (
  sum: number,
  suboutcome: SuboutcomeData,
  level: number,
): boolean => {
  // Stores the result
  let result = false;

  switch (level) {
    case 1:
      // If min level
      result = sum > suboutcome.Intervalo_zona_minima_max;
      break;

    case 2:
      // If med level
      result = sum > suboutcome.Intervalo_zona_media_max;
      break;

    default:
      return result;
  }

  return result;
};

export default surpassesHigherLimit;
