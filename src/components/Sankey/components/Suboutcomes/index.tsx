import React from 'react';

import { useApp } from 'contexts/app';

import Suboutcome from './components/Suboutcome';

import Container, { ContainerLabel } from './styles';

const Suboutcomes: React.FC = () => {
  const appContext = useApp();
  const { outcomes, suboutcomes } = appContext;

  return (
    <Container>
      <ContainerLabel>
        <strong>Fine-tune your chosen sub-outcomes</strong>
        <span>
          The min-max range reflects the efficiency of nutraceuticals
          <br />
          on this specific situation.
        </span>
      </ContainerLabel>
      {suboutcomes.map(suboutcome => {
        const outcomeColor = Object.values(outcomes).find(outcome =>
          outcome.suboutcomes.includes(suboutcome.id),
        )?.color;

        return (
          <Suboutcome
            key={suboutcome.id}
            {...suboutcome}
            color={outcomeColor || '#565656'}
          />
        );
      })}
    </Container>
  );
};

export default Suboutcomes;
