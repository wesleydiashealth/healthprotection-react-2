import QuestionAnswersData from './QuestionAnswersData';

export default interface QuestionData {
  id: string;
  slug: string;
  type: string;
  table: string;
  label: string;
  answers: {
    [key: string]: QuestionAnswersData;
  };
}
