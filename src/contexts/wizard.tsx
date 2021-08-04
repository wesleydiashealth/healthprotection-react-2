import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import api from '../services/api';
import QuestionData from '../dtos/QuestionData';

interface StepData {
  isCompleted?: boolean;
  isActive?: boolean;
  isDisabled?: boolean;
  answers: string | Array<string>;
}

interface StepsData {
  [key: string]: StepData;
}

interface WizardContextData {
  steps: StepsData;
  questions: QuestionsData;
  error: string;
  updateStep(step: string, attrs: StepData): Promise<void>;
  resetSteps(): Promise<void>;
}

interface QuestionsData {
  [key: string]: QuestionData;
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
  });

  const [questions, setQuestions] = useState<QuestionsData>({
    '1': {
      slug: '',
      type: '',
      table: '',
      label: '',
      answers: {},
    },
  });

  const [error, setError] = useState<string>('');

  useEffect(() => {
    api
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
