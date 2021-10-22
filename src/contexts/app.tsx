import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import wordpressApi from 'services/wordpress';

import defaultLabels from 'labels.json';

import ConnectionsData from 'dtos/ConnectionsData';
import AnswerData from 'dtos/AnswerData';
import ExcludesData from 'dtos/ExcludesData';
import OutcomeData from 'dtos/OutcomeData';
import SuboutcomeData from 'dtos/SuboutcomeData';
import NutraceuticalData from 'dtos/NutraceuticalData';
import FoodData from 'dtos/FoodData';
import HabitData from 'dtos/HabitData';

interface LabelsData {
  [key: string]: string;
}

interface StepData {
  isCompleted?: boolean;
  isActive?: boolean;
  isDisabled?: boolean;
}

interface StepsData {
  [key: string]: StepData;
}

interface AppContextData {
  labels: LabelsData;
  answers: AnswerData[];
  excludes: ExcludesData;
  steps: StepsData;
  userQuery: string;
  outcomes: OutcomeData[];
  suboutcomes: SuboutcomeData[];
  nutraceuticals: NutraceuticalData[];
  selectedNutraceuticals: string[];
  connections: ConnectionsData;
  selectedConnections: ConnectionsData;
  foods: FoodData[];
  habits: HabitData[];
  error: string;
  updateStep(step: string, attrs: StepData): Promise<void>;
  updateAnswers(answers: AnswerData[]): Promise<void>;
  updateExcludes(updatedExcludes: ExcludesData): Promise<void>;
  updateUserQuery(userQuery: string): Promise<void>;
  updateSelectedNutraceuticals(
    updatedSelectedNutraceuticals: string[],
  ): Promise<void>;
  updateOutcomes(updatedOutcomes: OutcomeData[]): Promise<void>;
  updateSuboutcomes(updatedSuboutcomes: SuboutcomeData[]): Promise<void>;
  updateConnection(suboutcome: string, nutraceuticals: string[]): Promise<void>;
  updateConnections(
    updatedOutcomes: OutcomeData[],
    updatedSuboutcomes: SuboutcomeData[],
  ): Promise<void>;
  updateSelectedConnections(allConnections: ConnectionsData): Promise<void>;
  updateFoods(updatedFoods: FoodData[]): Promise<void>;
  updateHabits(updatedHabits: HabitData[]): Promise<void>;
  updateError(updatedError: string): Promise<void>;
}

const AppContext = createContext<AppContextData>({} as AppContextData);

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const AppProvider: React.FC = ({ children }) => {
  const query = useQuery();

  const [labels, setLabels] = useState<LabelsData>(defaultLabels);

  const [steps, setSteps] = useState<StepsData>({
    step1: { isCompleted: false },
    step2: { isCompleted: false, isDisabled: true },
    step3: { isCompleted: false, isDisabled: true },
  });

  const [answers, setAnswers] = useState<AnswerData[]>([]);

  const [excludes, setExcludes] = useState<ExcludesData>({
    outcomes: [],
    suboutcomes: [],
    nutraceuticals: [],
  });

  const [userQuery, setUserQuery] = useState<string>('');

  const [outcomes, setOutcomes] = useState<OutcomeData[]>([]);
  const [suboutcomes, setSuboutcomes] = useState<SuboutcomeData[]>([]);

  const [nutraceuticals, setNutraceuticals] = useState<NutraceuticalData[]>([]);

  const [selectedNutraceuticals, setSelectedNutraceuticals] = useState<
    string[]
  >([]);

  const [connections, setConnections] = useState<ConnectionsData>({});

  const [selectedConnections, setSelectedConnections] =
    useState<ConnectionsData>({});

  const [foods, setFoods] = useState<FoodData[]>([]);

  const [habits, setHabits] = useState<HabitData[]>([]);

  const [error, setError] = useState<string>('');

  useEffect(() => {
    wordpressApi
      .get(`/wp-json/hp/v1/labels/${query.get('lang')}`)
      .then(response => {
        const { content, success } = response.data;

        if (success) {
          setLabels(content);
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

  async function updateAnswers(updatedAnswers: AnswerData[]) {
    setAnswers(updatedAnswers);
  }

  async function updateUserQuery(newUserQuery: string) {
    setUserQuery(newUserQuery);
  }

  async function updateExcludes(updatedExcludes: ExcludesData) {
    setExcludes(updatedExcludes);
  }

  async function updateSelectedNutraceuticals(
    updatedSelectedNutraceuticals: string[],
  ) {
    setSelectedNutraceuticals(updatedSelectedNutraceuticals);
  }

  async function updateOutcomes(updatedOutcomes: OutcomeData[]) {
    setOutcomes(updatedOutcomes);
  }

  async function updateSuboutcomes(updatedSuboutcomes: SuboutcomeData[]) {
    setSuboutcomes(updatedSuboutcomes);
  }

  async function updateConnection(suboutcome: string, items: string[]) {
    const updatedConnection = Object.entries(connections).findIndex(
      ({ 1: connection }) => !!Object.keys(connection).includes(suboutcome),
    );

    Object.values(connections)[updatedConnection][suboutcome] = items;

    setConnections({ ...connections });
  }

  async function updateConnections(
    updatedOutcomes: OutcomeData[],
    updatedSuboutcomes: SuboutcomeData[],
  ) {
    const validNutraceuticals = Array.from(
      new Set(
        updatedSuboutcomes.reduce(
          (acc: string[], updatedSuboutcome) => [
            ...acc,
            ...Array.from(
              new Set(
                Object.values(updatedSuboutcome.nutraceuticals).reduce(
                  (subAcc, subCurr) => [...subAcc, ...subCurr],
                  [],
                ),
              ),
            ),
          ],
          [],
        ),
      ),
    );

    const updatedConnections = updatedOutcomes.reduce(
      (acc, updatedOutcome) => ({
        ...acc,
        [updatedOutcome.id]: updatedOutcome.suboutcomes.reduce(
          (subAcc, outcomeSuboutcome) => {
            const suboutcomeNutraceuticals = Object.entries(connections)
              .filter(({ 0: connection }) =>
                connection.includes(updatedOutcome.id),
              )
              .reduce(
                (subConnectionsAcc: string[], { 1: subConnections }) => [
                  ...subConnectionsAcc,
                  ...Object.entries(subConnections)
                    .filter(({ 0: subConnection }) =>
                      subConnection.includes(outcomeSuboutcome),
                    )
                    .reduce(
                      (subConnectionAcc: string[], { 1: subConnection }) => [
                        ...subConnectionAcc,
                        ...subConnection.filter(item =>
                          validNutraceuticals.includes(item),
                        ),
                      ],
                      [],
                    ),
                ],
                [],
              );

            return {
              ...subAcc,
              [outcomeSuboutcome]: suboutcomeNutraceuticals || [],
            };
          },
          {},
        ),
      }),
      {},
    );

    setConnections(updatedConnections);

    // if (!Object.keys(connections).length) {
    //   const initialConnections: ConnectionsData = {};
    //   updatedOutcomes.forEach(outcome => {
    //     const { id, suboutcomes: outcomeSuboutcomes } = outcome;
    //     initialConnections[id] = {};
    //     outcomeSuboutcomes.forEach(outcomeSuboutcome => {
    //       initialConnections[id][outcomeSuboutcome] = [];
    //     });
    //   });
    //   setConnections(initialConnections);
    // } else {
    //   const updatedOutcomesIds = updatedOutcomes.reduce(
    //     (acc: string[], curr) => [...acc, curr.id],
    //     [],
    //   );
    //   let updatedConnections = Object.entries(connections)
    //     .filter(({ 0: connection }) => updatedOutcomesIds.includes(connection))
    //     .reduce(
    //       (acc, { 0: connection, 1: currs }) => ({
    //         ...acc,
    //         [connection]: Object.entries(currs).reduce(
    //           (subAcc, { 0: subKey, 1: subCurr }) => ({
    //             ...subAcc,
    //             [subKey]: subCurr,
    //           }),
    //           {},
    //         ),
    //       }),
    //       {},
    //     );
    //   const newSuboutcomes = updatedSuboutcomes
    //     .filter(
    //       updatedSuboutcome =>
    //         !Object.values(connections).filter(connection =>
    //           Object.keys(connection).includes(updatedSuboutcome.id),
    //         ).length,
    //     )
    //     .reduce((acc, updatedSuboutcome) => {
    //       const selectedOutcome = updatedOutcomes.find(updatedOutcome =>
    //         updatedOutcome.suboutcomes.includes(updatedSuboutcome.id),
    //       );
    //       return selectedOutcome
    //         ? { ...acc, [selectedOutcome.id]: { [updatedSuboutcome.id]: [] } }
    //         : acc;
    //     }, {});
    //   updatedConnections = { ...updatedConnections, ...newSuboutcomes };
    //   const newOutcomes = updatedOutcomes
    //     .filter(
    //       updatedOutcome =>
    //         !Object.keys(connections).includes(updatedOutcome.id),
    //     )
    //     .reduce(
    //       (acc, newOutcome) => ({
    //         ...acc,
    //         [newOutcome.id]: newOutcome.suboutcomes.reduce(
    //           (subAcc, newSuboutcome) => ({ ...subAcc, [newSuboutcome]: [] }),
    //           {},
    //         ),
    //       }),
    //       {},
    //     );
    //   updatedConnections = { ...updatedConnections, ...newOutcomes };
    //   setConnections({ ...updatedConnections });
    // }
  }

  async function updateSelectedConnections() {
    const updatedSelectedConnections = Object.entries(connections)
      .filter(({ 1: subConnections }) =>
        Object.values(subConnections).reduce(
          (acc: boolean, curr) => (curr.length ? !!curr.length : acc),
          false,
        ),
      )
      .reduce(
        (acc, { 0: key, 1: currs }) => ({
          ...acc,
          [key]: Object.entries(currs)
            .filter(({ 1: curr }) => !!curr.length)
            .reduce(
              (subAcc, { 0: subKey, 1: subCurr }) => ({
                ...subAcc,
                [subKey]: subCurr,
              }),
              {},
            ),
        }),
        {},
      );

    setSelectedConnections({ ...updatedSelectedConnections });
  }

  async function updateFoods(updatedFoods: FoodData[]) {
    setFoods(updatedFoods);
  }

  async function updateHabits(updatedHabits: HabitData[]) {
    setHabits(updatedHabits);
  }

  async function updateError(updatedError: string) {
    setError(updatedError);
  }

  return (
    <AppContext.Provider
      value={{
        labels,
        answers,
        excludes,
        steps,
        userQuery,
        outcomes,
        suboutcomes,
        nutraceuticals,
        selectedNutraceuticals,
        connections,
        selectedConnections,
        foods,
        habits,
        error,
        updateStep,
        updateAnswers,
        updateExcludes,
        updateUserQuery,
        updateSelectedNutraceuticals,
        updateOutcomes,
        updateSuboutcomes,
        updateConnection,
        updateConnections,
        updateSelectedConnections,
        updateFoods,
        updateHabits,
        updateError,
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
