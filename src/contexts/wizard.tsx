import React, { createContext, useContext, useState } from 'react';

interface StepsData {
  [key: string]: boolean;
}

interface WizardContextData {
  steps: StepsData;
  updateStep(step: string, status: boolean): Promise<void>;
  resetSteps(): Promise<void>;
}

const WizardContext = createContext<WizardContextData>({} as WizardContextData);

export const WizardProvider: React.FC = ({ children }) => {
  const [steps, setSteps] = useState<StepsData>({});

  async function updateStep(step: string, status: boolean) {
    steps[step] = status;

    setSteps({ ...steps });
  }

  async function resetSteps() {
    setSteps({});
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
