import React, { createContext, useContext, useState } from 'react';

interface SankeyContextData {
  activeAccordions: string[];
  updateActiveAccordions(outcome: string): Promise<void>;
}

const SankeyContext = createContext<SankeyContextData>({} as SankeyContextData);

export const SankeyProvider: React.FC = ({ children }) => {
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
