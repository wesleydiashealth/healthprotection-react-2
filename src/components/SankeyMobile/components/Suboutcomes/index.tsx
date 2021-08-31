import React from 'react';

import { useSankey } from 'contexts/sankey';
import Suboutcome from './components/Suboutcome';

import Container from './styles';

interface SuboutcomesProps {
  outcome: string;
  outcomeSuboutcomes: string[];
  color?: string;
}

const Suboutcomes: React.FC<SuboutcomesProps> = ({
  outcome,
  outcomeSuboutcomes,
  color,
}) => {
  const sankeyContext = useSankey();
  const { suboutcomes } = sankeyContext;

  return (
    <Container color={color}>
      {suboutcomes
        .filter(suboutcome => outcomeSuboutcomes.indexOf(suboutcome.id) > -1)
        .map(suboutcome => {
          return (
            <Suboutcome
              key={suboutcome.id}
              outcome={outcome}
              color={color}
              {...suboutcome}
            />
          );
        })}
    </Container>
  );
};

export default Suboutcomes;
