import React, { createContext, useContext } from 'react';

interface WizardContextData {
  step1Completed: boolean;
}

const WizardContext = createContext<WizardContextData>({} as WizardContextData);

export const WizardProvider: React.FC = ({ children }) => {
  return (
    <WizardContext.Provider value={{} as WizardContextData}>
      {children}
    </WizardContext.Provider>
  );
};

export function useWizard(): WizardContextData {
  const context = useContext(WizardContext);

  return context;
}
