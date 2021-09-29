import React from 'react';

import { useApp } from 'contexts/app';

import Outcome from './components/Outcome';

import Container, { ContainerLabel } from './styles';

const Outcomes: React.FC = () => {
  const appContext = useApp();
  const { outcomes } = appContext;

  return (
    <Container>
      <ContainerLabel>Filtered Outcomes</ContainerLabel>
      {outcomes.map(outcome => {
        return <Outcome key={outcome.id} {...outcome} />;
      })}
    </Container>
  );
};

export default Outcomes;
