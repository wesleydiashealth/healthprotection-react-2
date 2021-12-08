/* eslint-disable camelcase */
export default interface ApiSuboutcomeData {
  ID: number;
  Nome: string;
  Slug: string;
  Nome_outcome: string;
  Regra_exclusao_medicamentosa: number;
  Intervalo_zona_minima_min: number;
  Intervalo_zona_minima_max: number;
  Intervalo_zona_media_min: number;
  Intervalo_zona_media_max: number;
  Limite_nutraceuticos: number;
  Taxa_desconto_coeficiente_linear: number;
  Taxa_desconto_coeficiente_angular: number;
}
