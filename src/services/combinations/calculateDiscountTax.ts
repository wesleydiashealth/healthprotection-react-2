import weightSettings from './settings';

import SuboutcomeData from './dtos/SuboutcomeData';

const calculateDiscountTax = (
  amountOfNutraceuticals: number,
  suboutcome: SuboutcomeData,
  level: number,
): number => {
  // Calculates the discount tax using the amount of nutraceuticals with a logarithm function
  const amountOfExtraNutraceuticals =
    amountOfNutraceuticals - suboutcome.Limite_nutraceuticos;

  // Initializes the discount tax
  let discountTax = 0;

  // If surpassed the limit of nutraceuticals
  if (amountOfExtraNutraceuticals > 0) {
    // Allow user to select the function type
    switch (weightSettings.discountTaxEquation.selected) {
      case 'Exponential':
        // If not looking for maximum score, applies a logarithm discount
        if (level < 3)
          discountTax =
            (Math.log(amountOfExtraNutraceuticals) *
              suboutcome.Taxa_desconto_coeficiente_angular +
              suboutcome.Taxa_desconto_coeficiente_linear) /
            100;
        // Or else, applies an exponential discount
        else
          discountTax =
            (10 ** amountOfExtraNutraceuticals /
              suboutcome.Taxa_desconto_coeficiente_angular +
              suboutcome.Taxa_desconto_coeficiente_linear) /
            100;

        break;

      case 'Linear':
        // Applies a linear discount
        discountTax =
          (amountOfExtraNutraceuticals *
            suboutcome.Taxa_desconto_coeficiente_angular +
            suboutcome.Taxa_desconto_coeficiente_linear) /
          100;

        break;

      default:
        return discountTax;
    }
  }

  return discountTax;
};

export default calculateDiscountTax;
