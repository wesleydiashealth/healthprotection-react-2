export default interface AnswerData {
  question: string;
  answer: string;
  subAnswer?: AnswerData[];
}
