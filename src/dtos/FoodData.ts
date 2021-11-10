import InteractionData from './InteractionData';

export default interface FoodData {
  slug: string;
  title: string;
  content: string;
  icon: string;
  diet: string[];
  allergy: string[];
  unit: string;
  dosages: string;
  interactions: InteractionData[];
  dataSource: string[];
  intakeFrequency: {
    value: string;
    label: string;
  }[];
}
