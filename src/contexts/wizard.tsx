import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import wordpressApi from 'services/wordpress';
import QuestionData from 'dtos/QuestionData';
import QuestionAnswersData from 'dtos/QuestionAnswersData';

interface StepData {
  isCompleted?: boolean;
  isActive?: boolean;
  isDisabled?: boolean;
  answers: string | Array<string>;
  subAnswers?: QuestionAnswersData[];
}

interface StepsData {
  [key: string]: StepData;
}

interface WizardContextData {
  steps: StepsData;
  questions: QuestionData[];
  error: string;
  updateStep(step: string, attrs: StepData): Promise<void>;
  resetSteps(): Promise<void>;
}

const WizardContext = createContext<WizardContextData>({} as WizardContextData);

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const WizardProvider: React.FC = ({ children }) => {
  const query = useQuery();

  const [steps, setSteps] = useState<StepsData>({
    step1: { isCompleted: false, answers: [] },
    step2: { isCompleted: false, answers: [] },
    step2_1: { isCompleted: false, answers: [] },
    step3: { isCompleted: false, answers: [] },
    step4: { isCompleted: false, answers: [] },
    step5: { isCompleted: false, answers: [] },
    step5_1: { isCompleted: false, answers: [] },
    step5_2: { isCompleted: false, answers: [] },
    step5_3: { isCompleted: false, answers: [] },
    step5_4: { isCompleted: false, answers: [] },
    step6: { isCompleted: false, answers: [] },
    step6_1: { isCompleted: false, answers: [] },
    step6_2: { isCompleted: false, answers: [] },
    step6_3: { isCompleted: false, answers: [] },
    step6_4: { isCompleted: false, answers: [] },
    step7: { isCompleted: false, answers: [] },
    step7_1: { isCompleted: false, answers: [] },
    step8: { isCompleted: false, answers: [] },
    step8_1: { isCompleted: false, answers: [] },
    step9: { isCompleted: false, answers: [] },
  });

  const [questions, setQuestions] = useState<QuestionData[]>([]);

  const [error, setError] = useState<string>('');

  useEffect(() => {
    wordpressApi
      .get(`/wp-json/hp/v1/wizard/${query.get('lang')}`)
      .then(response => {
        const { content, success, message } = response.data;

        if (success) {
          setQuestions(content);
          setError('');
        } else {
          setError(message);
        }
      })
      .catch(err => {
        if (err.response) {
          setError(err.response.data.message);
        } else if (err.request) {
          const errorMessage = err.request.response
            ? JSON.parse(err.request.response).message
            : 'Unknown Error';

          setError(errorMessage);
        } else {
          setError(err.message);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function updateStep(step: string, attrs: StepData) {
    steps[step] = attrs;

    setSteps({ ...steps });
  }

  async function resetSteps() {
    Object.keys(steps).forEach(step => {
      updateStep(step, { isCompleted: false, answers: [] });
    });
  }

  return (
    <WizardContext.Provider
      value={{ steps, questions, error, updateStep, resetSteps }}
    >
      {children}
    </WizardContext.Provider>
  );
};

export function useWizard(): WizardContextData {
  const context = useContext(WizardContext);

  return context;
}
