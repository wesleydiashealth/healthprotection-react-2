import React from 'react';

import { useSankey } from 'contexts/sankey';
import Outcome from './components/Outcome';

import Container from './styles';

const Outcomes: React.FC = () => {
  const sankeyContext = useSankey();
  const { outcomes } = sankeyContext;

  return (
    <Container>
      {outcomes.map(outcome => {
        return <Outcome key={outcome.id} {...outcome} />;
      })}
    </Container>
  );
};

export default Outcomes;
