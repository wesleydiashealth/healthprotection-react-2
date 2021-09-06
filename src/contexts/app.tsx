import React, { createContext, useContext, useState } from 'react';

interface StepData {
  isCompleted?: boolean;
  isActive?: boolean;
  isDisabled?: boolean;
}

interface StepsData {
  [key: string]: StepData;
}

interface AppContextData {
  steps: StepsData;
  userQuery: string;
  updateUserQuery(userQuery: string): Promise<void>;
  updateStep(step: string, attrs: StepData): Promise<void>;
}

const AppContext = createContext<AppContextData>({} as AppContextData);

export const AppProvider: React.FC = ({ children }) => {
  const [steps, setSteps] = useState<StepsData>({
    step1: { isCompleted: false },
    step2: { isCompleted: false, isDisabled: true },
    step3: { isCompleted: false, isDisabled: true },
  });

  const [userQuery, setUserQuery] = useState<string>('');

  async function updateStep(step: string, attrs: StepData) {
    steps[step] = attrs;

    setSteps({ ...steps });
  }

  async function updateUserQuery(newUserQuery: string) {
    setUserQuery(newUserQuery);
  }

  return (
    <AppContext.Provider
      value={{ steps, userQuery, updateUserQuery, updateStep }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useApp(): AppContextData {
  const context = useContext(AppContext);

  return context;
}
