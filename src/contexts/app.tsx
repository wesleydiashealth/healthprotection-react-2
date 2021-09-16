import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import wordpressApi from 'services/wordpress';

import OutcomeData from 'dtos/OutcomeData';
import SuboutcomeData from 'dtos/SuboutcomeData';
import NutraceuticalData from 'dtos/NutraceuticalData';
import FoodData from 'dtos/FoodData';

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
  nutraceuticals: NutraceuticalData[];
  connections: ConnectionsProps;
  foods: FoodData[];
  error: string;
  updateStep(step: string, attrs: StepData): Promise<void>;
  updateUserQuery(userQuery: string): Promise<void>;
  updateOutcomes(updatedOutcomes: OutcomeData[]): Promise<void>;
  updateSuboutcomes(updatedSuboutcomes: SuboutcomeData[]): Promise<void>;
  updateConnections(
    suboutcome: string,
    nutraceuticals: string[],
  ): Promise<void>;
  updateFoods(updatedFoods: FoodData[]): Promise<void>;
}

interface ConnectionsProps {
  [key: string]: {
    [key: string]: string[];
  };
}

const AppContext = createContext<AppContextData>({} as AppContextData);

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const AppProvider: React.FC = ({ children }) => {
  const [steps, setSteps] = useState<StepsData>({
    step1: { isCompleted: false },
    step2: { isCompleted: false, isDisabled: true },
    step3: { isCompleted: false, isDisabled: true },
  });

  const query = useQuery();

  const [userQuery, setUserQuery] = useState<string>('');

  const [outcomes, setOutcomes] = useState<OutcomeData[]>([]);
  const [suboutcomes, setSuboutcomes] = useState<SuboutcomeData[]>([]);

  const [nutraceuticals, setNutraceuticals] = useState<NutraceuticalData[]>([]);

  const [connections, setConnections] = useState<ConnectionsProps>({});

  const [foods, setFoods] = useState<FoodData[]>([]);

  const [error, setError] = useState<string>('');

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

  useEffect(() => {
    wordpressApi
      .get(`/wp-json/hp/v1/nutraceuticals/${query.get('lang')}`)
      .then(response => {
        const { content, success, message } = response.data;

        if (success) {
          setNutraceuticals(content);
          setError('');
        } else {
          setError(message);
        }
      })
      .catch(err => {
        if (err.response) {
          setError(err.request.data.message);
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

  async function updateFoods(updatedFoods: FoodData[]) {
    setFoods(updatedFoods);
  }

  return (
    <AppContext.Provider
      value={{
        steps,
        userQuery,
        outcomes,
        suboutcomes,
        nutraceuticals,
        connections,
        foods,
        error,
        updateStep,
        updateUserQuery,
        updateOutcomes,
        updateSuboutcomes,
        updateConnections,
        updateFoods,
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
