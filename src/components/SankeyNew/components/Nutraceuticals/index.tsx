import React from 'react';

import Nutraceutical from './components/Nutraceutical';

import Container from './styles';

import { useSankey } from '../../../../contexts/sankey';

import sankeyData from '../../../../sankey-new.json';

const Nutraceuticals: React.FC = () => {
  const context = useSankey();
  const { connections } = context;

  const { nutraceuticals } = sankeyData;

  return (
    <Container>
      {Object.entries(connections).map(subconnections => {
        const { 1: suboutcomes } = subconnections;

        return Object.entries(suboutcomes)
          .filter(subconnection => !!subconnection.length)
          .map(subconnection => {
            const { 1: nutraceuticalKeys } = subconnection;

            return (
              Array.isArray(nutraceuticalKeys) &&
              nutraceuticalKeys.map(nutraceuticalKey => {
                const nutraceutical = Object.values(nutraceuticals).find(
                  item => item.id === nutraceuticalKey,
                );

                return (
                  nutraceutical && (
                    <Nutraceutical key={nutraceutical.id} {...nutraceutical} />
                  )
                );
              })
            );
          });
      })}
    </Container>
  );
};

export default Nutraceuticals;
