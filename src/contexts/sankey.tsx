import React, { createContext, useContext, useState } from 'react';

import sankeyData from '../sankey-new.json';

interface SankeyContextData {
  connections: ConnectionsProps;
  updateConnections(
    suboutcome: string,
    nutraceuticals: string[],
  ): Promise<void>;
}

interface ConnectionsProps {
  [key: string]: any;
}

const SankeyContext = createContext<SankeyContextData>({} as SankeyContextData);

export const SankeyProvider: React.FC = ({ children }) => {
  const { outcomes } = sankeyData;

  const [connections, setConnections] = useState<ConnectionsProps>(() => {
    const initialConnections: ConnectionsProps = {};

    Object.entries(outcomes).forEach(outcome => {
      const { 0: key, 1: value } = outcome;

      initialConnections[key] = {};

      value.suboutcomes.forEach(suboutcome => {
        initialConnections[key][suboutcome] = [];
      });
    });

    return initialConnections;
  });

  async function updateConnections(
    suboutcome: string,
    nutraceuticals: string[],
  ) {
    const updatedConnections = Object.values(connections).reduce(
      (accumulator, connection, index) => {
        if (Object.keys(connection).includes(suboutcome))
          accumulator.push(index);

        return accumulator;
      },
      [],
    );

    if (Array.isArray(updatedConnections)) {
      updatedConnections.forEach(updatedConnection => {
        Object.values(connections)[updatedConnection][suboutcome] =
          nutraceuticals;
      });
    }

    setConnections({ ...connections });
  }

  return (
    <SankeyContext.Provider value={{ connections, updateConnections }}>
      {children}
    </SankeyContext.Provider>
  );
};

export function useSankey(): SankeyContextData {
  const context = useContext(SankeyContext);

  return context;
}
