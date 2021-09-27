import RelationData from './RelationData';

export default interface NutraceuticalData {
  slug: string;
  title: string;
  dosage: string;
  info: {
    slug: string;
    title: string;
    link: string;
    description: string;
    relations: RelationData[];
    studies: number;
  };
}
