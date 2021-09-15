export default interface NutraceuticalData {
  slug: string;
  title: string;
  dosage: string;
  info: {
    slug: string;
    title: string;
    description: string;
  };
}
