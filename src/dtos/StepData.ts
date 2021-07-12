import AnswerData from './AnswerData';

export default interface StepData {
  slug: string;
  type: string;
  table: string;
  label: string;
  answers: {
    [key: string]: AnswerData;
  };
}
