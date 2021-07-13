import QuestionAnswersData from './QuestionAnswersData';

export default interface QuestionData {
  slug: string;
  type: string;
  table: string;
  label: string;
  answers: {
    [key: string]: QuestionAnswersData;
  };
}
