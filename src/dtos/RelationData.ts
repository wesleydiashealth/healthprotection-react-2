export default interface RelationData {
  slug: string;
  title: string;
  outcome: {
    slug: string;
    title: string;
    link: string;
  };
  suboutcome: {
    slug: string;
    title: string;
    link: string;
  };
  description: string;
  studies: number;
  levelOfEvidence: string;
  magnitudeOfEffect: string;
  link: string;
}
