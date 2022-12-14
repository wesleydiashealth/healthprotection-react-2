import React from 'react';

import { useApp } from 'contexts/app';

import Outcome from './components/Outcome';

import Container, { ContainerLabel } from './styles';

interface OutcomesData {
  selectedOutcomes?: string[];
}

const Outcomes: React.FC<OutcomesData> = ({ selectedOutcomes }) => {
  const appContext = useApp();
  const { labels, outcomes, connections } = appContext;

  return (
    <Container>
      <ContainerLabel>{labels.step_2_outcomes}</ContainerLabel>
      {Object.entries(connections)
        .filter(({ 0: connection }) =>
          selectedOutcomes?.length
            ? selectedOutcomes.includes(connection)
            : true,
        )
        .map(({ 0: connection }) => {
          const currentOutcome = outcomes.find(
            outcome => outcome.id === connection,
          );

          return (
            currentOutcome && (
              <Outcome key={currentOutcome.id} {...currentOutcome} />
            )
          );
        })}
    </Container>
  );
};

Outcomes.defaultProps = {
  selectedOutcomes: [],
};

export default Outcomes;
