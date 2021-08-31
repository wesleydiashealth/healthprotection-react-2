import React, { createContext, useContext, useState } from 'react';

import Outcomes from '../outcomes.json';
import Suboutcomes from '../suboutcomes.json';
import Nutraceuticals from '../nutraceuticals.json';

interface SankeyContextData {
  outcomes: OutcomeProps[];
  suboutcomes: SuboutcomeProps[];
  nutraceuticals: NutraceuticalProps[];
  connections: ConnectionsProps;
  activeAccordions: string[];
  updateConnections(
    suboutcome: string,
    nutraceuticals: string[],
  ): Promise<void>;
  updateActiveAccordions(outcome: string): Promise<void>;
}

interface OutcomeProps {
  id: string;
  title: string;
  color: string;
  description: string;
  suboutcomes: string[];
}

interface SuboutcomeProps {
  id: string;
  title: string;
  description: string;
  nutraceuticals: {
    min: string[];
    med: string[];
    max: string[];
  };
}

interface NutraceuticalProps {
  id: string;
  title: string;
  dosage: number;
  unit: string;
  label: string;
  description: string;
}

interface ConnectionsProps {
  [key: string]: {
    [key: string]: string[];
  };
}

const SankeyContext = createContext<SankeyContextData>({} as SankeyContextData);

export const SankeyProvider: React.FC = ({ children }) => {
  const [outcomes] = useState<OutcomeProps[]>(Outcomes);
  const [suboutcomes] = useState<SuboutcomeProps[]>(Suboutcomes);
  const [nutraceuticals] = useState<NutraceuticalProps[]>(Nutraceuticals);
  const [activeAccordions, setActiveAccordions] = useState<string[]>([]);

  const [connections, setConnections] = useState<ConnectionsProps>(() => {
    const initialConnections: ConnectionsProps = {};

    outcomes.forEach(outcome => {
      const { id, suboutcomes: outcomeSuboutcomes } = outcome;

      initialConnections[id] = {};

      outcomeSuboutcomes.forEach(outcomeSuboutcome => {
        initialConnections[id][outcomeSuboutcome] = [];
      });
    });

    return initialConnections;
  });

  async function updateConnections(suboutcome: string, items: string[]) {
    const updatedConnection = Object.entries(connections).findIndex(
      ({ 1: connection }) => !!Object.keys(connection).includes(suboutcome),
    );

    Object.values(connections)[updatedConnection][suboutcome] = items;

    setConnections({ ...connections });
  }

  async function updateActiveAccordions(outcome: string) {
    const updatedActiveAccordions = [...activeAccordions];

    const outcomeIndex = activeAccordions.indexOf(outcome);

    if (outcomeIndex > -1) {
      updatedActiveAccordions.splice(outcomeIndex, 1);
    } else {
      updatedActiveAccordions.push(outcome);
    }
    setActiveAccordions([...updatedActiveAccordions]);
  }

  return (
    <SankeyContext.Provider
      value={{
        outcomes,
        suboutcomes,
        nutraceuticals,
        connections,
        activeAccordions,
        updateConnections,
        updateActiveAccordions,
      }}
    >
      {children}
    </SankeyContext.Provider>
  );
};

export function useSankey(): SankeyContextData {
  const context = useContext(SankeyContext);

  return context;
}
