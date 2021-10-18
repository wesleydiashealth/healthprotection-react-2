import React from 'react';

import { useApp } from 'contexts/app';

import Outcome from './components/Outcome';

import Container, { ContainerLabel } from './styles';

interface OutcomesData {
  selectedOutcomes?: string[];
}

const Outcomes: React.FC<OutcomesData> = ({ selectedOutcomes }) => {
  const appContext = useApp();
  const { outcomes } = appContext;

  return (
    <Container>
      <ContainerLabel>Filtered Outcomes</ContainerLabel>
      {outcomes
        .filter(outcome =>
          selectedOutcomes?.length
            ? selectedOutcomes.includes(outcome.id)
            : true,
        )
        .map(outcome => {
          return <Outcome key={outcome.id} {...outcome} />;
        })}
    </Container>
  );
};

Outcomes.defaultProps = {
  selectedOutcomes: [],
};

export default Outcomes;
