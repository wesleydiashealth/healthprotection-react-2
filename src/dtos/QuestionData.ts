import QuestionAnswersData from './QuestionAnswersData';

export default interface QuestionData {
  id: string;
  slug: string;
  type: string;
  table: string;
  label: string;
  description: string;
  exclude: string;
  answers: {
    [key: string]: QuestionAnswersData;
  };
}
