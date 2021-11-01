import RelationData from './RelationData';

export default interface NutraceuticalData {
  slug: string;
  title: string;
  dosage: string;
  info: {
    slug: string;
    title: string;
    dosage: number;
    dosageUnit: string;
    link: string;
    description: string;
    relations: RelationData[];
    studies: number;
    product1: {
      productName: string;
      productImage: string;
      productLink: string;
      productBrand: string;
      productDosageCapsule: number;
      productCapsules: number;
      productPrice: number;
    };
    product2: {
      productName: string;
      productImage: string;
      productLink: string;
      productBrand: string;
      productDosageCapsule: number;
      productCapsules: number;
      productPrice: number;
    };
  };
}
