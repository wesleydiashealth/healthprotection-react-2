import React, { createContext, useContext, useState } from 'react';

import Nutraceuticals from '../nutraceuticals.json';

interface SankeyContextData {
  nutraceuticals: NutraceuticalProps[];
  activeAccordions: string[];
  updateActiveAccordions(outcome: string): Promise<void>;
}

interface NutraceuticalProps {
  id: string;
  title: string;
  dosage: number;
  unit: string;
  label: string;
  description: string;
}

const SankeyContext = createContext<SankeyContextData>({} as SankeyContextData);

export const SankeyProvider: React.FC = ({ children }) => {
  const [nutraceuticals] = useState<NutraceuticalProps[]>(Nutraceuticals);
  const [activeAccordions, setActiveAccordions] = useState<string[]>([]);

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
        nutraceuticals,
        activeAccordions,
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
