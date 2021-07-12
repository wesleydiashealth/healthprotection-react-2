import React, { createContext, useContext, useState } from 'react';

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
  updateStep(step: string, attrs: StepData): Promise<void>;
  resetSteps(): Promise<void>;
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
    <WizardContext.Provider value={{ steps, updateStep, resetSteps }}>
      {children}
    </WizardContext.Provider>
  );
};

export function useWizard(): WizardContextData {
  const context = useContext(WizardContext);

  return context;
}
