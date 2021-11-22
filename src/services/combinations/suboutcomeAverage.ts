import SuboutcomeData from './dtos/SuboutcomeData';

interface ResponseData {
  average: number;
  higherLimit: number;
  bottomLimit: number;
}

const suboutcomeAverage = (
  suboutcome: SuboutcomeData,
  level: number,
): ResponseData => {
  // Stores the result
  let average = 0;
  let higherLimit = 0;
  let bottomLimit = 0;

  switch (level) {
    case 1:
      // If min level
      higherLimit = suboutcome.Intervalo_zona_minima_max;
      bottomLimit = suboutcome.Intervalo_zona_minima_min;
      average = (bottomLimit + higherLimit) / 2;

      break;

    case 2:
      // If med level
      higherLimit = suboutcome.Intervalo_zona_media_max;
      bottomLimit = suboutcome.Intervalo_zona_media_min;
      average = (bottomLimit + higherLimit) / 2;

      break;

    default:
      return { average, higherLimit, bottomLimit };
  }

  return { average, higherLimit, bottomLimit };
};

export default suboutcomeAverage;
