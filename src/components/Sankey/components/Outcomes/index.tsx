import React from 'react';

import { useApp } from 'contexts/app';

import Outcome from './components/Outcome';

import Container, { ContainerLabel } from './styles';

interface OutcomesData {
  selectedOutcomes?: string[];
}

const Outcomes: React.FC<OutcomesData> = ({ selectedOutcomes }) => {
  const appContext = useApp();
  const { outcomes, connections } = appContext;

  return (
    <Container>
      <ContainerLabel>Filtered Outcomes</ContainerLabel>
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
      {/* {outcomes
        .filter(outcome =>
          selectedOutcomes?.length
            ? selectedOutcomes.includes(outcome.id)
            : true,
        )
        .map(outcome => {
          return <Outcome key={outcome.id} {...outcome} />;
        })} */}
    </Container>
  );
};

Outcomes.defaultProps = {
  selectedOutcomes: [],
};

export default Outcomes;
