import SuboutcomeData from './dtos/SuboutcomeData';

const surpassesBottomLimit = (
  sum: number,
  suboutcome: SuboutcomeData,
  level: number,
): boolean => {
  // Stores the result
  let result = false;

  switch (level) {
    // If min level
    case 1:
      result = sum < suboutcome.Intervalo_zona_minima_min;
      break;

    // If med level
    case 2:
      result = sum < suboutcome.Intervalo_zona_media_min;
      break;

    // If max level
    case 3:
      result = sum < suboutcome.Intervalo_zona_media_max;
      break;

    default:
      return result;
  }

  return result;
};

export default surpassesBottomLimit;
