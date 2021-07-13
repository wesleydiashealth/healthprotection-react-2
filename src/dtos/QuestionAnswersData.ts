/* eslint-disable camelcase */
export default interface QuestionAnswersData {
  id: number;
  api: string;
  type?: string;
  label?: string;
  has_child: boolean;
  slug?: string;
  internal?: {
    [key: string]: QuestionAnswersData;
  };
}
