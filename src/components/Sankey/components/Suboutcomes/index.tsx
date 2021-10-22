import React from 'react';
import { FaToggleOn } from 'react-icons/fa';

import { useApp } from 'contexts/app';

import Suboutcome from './components/Suboutcome';

import Container, { ContainerLabel } from './styles';

interface SuboutcomesData {
  selectedSuboutcomes?: string[];
}

const Suboutcomes: React.FC<SuboutcomesData> = ({ selectedSuboutcomes }) => {
  const appContext = useApp();
  const { outcomes, suboutcomes, connections } = appContext;

  return (
    <Container>
      <ContainerLabel>
        <strong>Fine-tune your chosen sub-outcomes</strong>

        <span>
          <FaToggleOn /> The range on the min-med-max selector refletcs the
          efficiency of the nutraceutical(s) on the condition.
        </span>
      </ContainerLabel>
      {Object.values(connections).map(subConnections =>
        Object.keys(subConnections)
          .filter(subConnection =>
            selectedSuboutcomes?.length
              ? selectedSuboutcomes.includes(subConnection)
              : true,
          )
          .map(subConnection => {
            const currentSuboutcome = suboutcomes.find(
              suboutcome => suboutcome.id === subConnection,
            );

            const outcomeColor = Object.values(outcomes).find(outcome =>
              outcome.suboutcomes.includes(subConnection),
            )?.color;

            return (
              currentSuboutcome && (
                <Suboutcome
                  key={currentSuboutcome.id}
                  {...currentSuboutcome}
                  color={outcomeColor || '#565656'}
                />
              )
            );
          }),
      )}
      {/* {suboutcomes
        .filter(suboutcome =>
          selectedSuboutcomes?.length
            ? selectedSuboutcomes.includes(suboutcome.id)
            : true,
        )
        .map(suboutcome => {
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
        })} */}
    </Container>
  );
};

Suboutcomes.defaultProps = {
  selectedSuboutcomes: [],
};

export default Suboutcomes;
