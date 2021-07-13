import React, { createContext, useContext, useState, useEffect } from 'react';

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

export const WizardProvider: React.FC = ({ children }) => {
  const [steps, setSteps] = useState<StepsData>({
    step1: { isCompleted: false, answers: [] },
    step2: { isCompleted: false, answers: [] },
    step2_1: { isCompleted: false, answers: [] },
    step3: { isCompleted: false, answers: [] },
    step4: { isCompleted: false, answers: [] },
    step5: { isCompleted: false, answers: [] },
    step5_1: { isCompleted: false, answers: [] },
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
      .get('/wp-json/hp/v1/wizard/')
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
        setError(err);
      });
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
