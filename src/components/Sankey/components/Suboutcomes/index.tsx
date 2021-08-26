import React from 'react';

import { useSankey } from 'contexts/sankey';
import Suboutcome from './components/Suboutcome';

import Container from './styles';

const Suboutcomes: React.FC = () => {
  const sankeyContext = useSankey();
  const { outcomes, suboutcomes } = sankeyContext;

  return (
    <Container>
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
