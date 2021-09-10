import React, { createContext, useContext, useState, useEffect } from 'react';

import OutcomeData from 'dtos/OutcomeData';
import SuboutcomeData from 'dtos/SuboutcomeData';

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
  outcomes: OutcomeData[];
  suboutcomes: SuboutcomeData[];
  connections: ConnectionsProps;
  updateStep(step: string, attrs: StepData): Promise<void>;
  updateUserQuery(userQuery: string): Promise<void>;
  updateOutcomes(updatedOutcomes: OutcomeData[]): Promise<void>;
  updateSuboutcomes(updatedSuboutcomes: SuboutcomeData[]): Promise<void>;
  updateConnections(
    suboutcome: string,
    nutraceuticals: string[],
  ): Promise<void>;
}

interface ConnectionsProps {
  [key: string]: {
    [key: string]: string[];
  };
}

const AppContext = createContext<AppContextData>({} as AppContextData);

export const AppProvider: React.FC = ({ children }) => {
  const [steps, setSteps] = useState<StepsData>({
    step1: { isCompleted: false },
    step2: { isCompleted: false, isDisabled: true },
    step3: { isCompleted: false, isDisabled: true },
  });

  const [userQuery, setUserQuery] = useState<string>('');

  const [outcomes, setOutcomes] = useState<OutcomeData[]>([]);
  const [suboutcomes, setSuboutcomes] = useState<SuboutcomeData[]>([]);

  const [connections, setConnections] = useState<ConnectionsProps>({});

  useEffect(() => {
    const initialConnections: ConnectionsProps = {};

    outcomes.forEach(outcome => {
      const { id, suboutcomes: outcomeSuboutcomes } = outcome;

      initialConnections[id] = {};

      outcomeSuboutcomes.forEach(outcomeSuboutcome => {
        initialConnections[id][outcomeSuboutcome] = [];
      });
    });

    setConnections(initialConnections);
  }, [outcomes]);

  async function updateStep(step: string, attrs: StepData) {
    steps[step] = attrs;

    setSteps({ ...steps });
  }

  async function updateUserQuery(newUserQuery: string) {
    setUserQuery(newUserQuery);
  }

  async function updateOutcomes(updatedOutcomes: OutcomeData[]) {
    setOutcomes(updatedOutcomes);
  }

  async function updateSuboutcomes(updatedSuboutcomes: SuboutcomeData[]) {
    setSuboutcomes(updatedSuboutcomes);
  }

  async function updateConnections(suboutcome: string, items: string[]) {
    const updatedConnection = Object.entries(connections).findIndex(
      ({ 1: connection }) => !!Object.keys(connection).includes(suboutcome),
    );

    Object.values(connections)[updatedConnection][suboutcome] = items;

    setConnections({ ...connections });
  }

  return (
    <AppContext.Provider
      value={{
        steps,
        userQuery,
        outcomes,
        suboutcomes,
        connections,
        updateStep,
        updateUserQuery,
        updateOutcomes,
        updateSuboutcomes,
        updateConnections,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useApp(): AppContextData {
  const context = useContext(AppContext);

  return context;
}
