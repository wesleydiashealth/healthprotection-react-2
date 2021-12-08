/* eslint-disable camelcase */
export default interface ApiNutraceuticalData {
  ID_Suboutcome: number;
  Nome_Suboutcome: string;
  ID_Nutraceutico: number;
  Nutraceutico: string;
  Slug: string;
  Dosagem: number;
  Score: number;
  Importancia: string | null;
  Pontuacao_boost: number;
}
