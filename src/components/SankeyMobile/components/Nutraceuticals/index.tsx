import React from 'react';

import { useApp } from 'contexts/app';
import { useSankey } from 'contexts/sankey';

import Nutraceutical from './components/Nutraceutical';

import Container from './styles';

const Nutraceuticals: React.FC = () => {
  const appContext = useApp();
  const { connections } = appContext;

  const context = useSankey();
  const { nutraceuticals } = context;

  const selectedNutraceuticals = Object.values(connections)
    .reduce(
      (accumulator: string[], connection) => [
        ...accumulator,
        ...Object.values(connection)
          .filter(subconnections => !!subconnections.length)
          .reduce(
            (subAccumulator, subconnections) => [
              ...subAccumulator,
              ...subconnections,
            ],
            [],
          )
          .filter((val, index, array) => array.indexOf(val) === index),
      ],
      [],
    )
    .filter((val, index, array) => array.indexOf(val) === index);

  return (
    <Container isActive={!!selectedNutraceuticals.length}>
      {selectedNutraceuticals.map(selectedNutraceutical => {
        const nutraceutical = nutraceuticals.find(
          item => item.id === selectedNutraceutical,
        );

        return (
          nutraceutical && (
            <Nutraceutical key={nutraceutical.id} {...nutraceutical}>
              {nutraceutical.title}
            </Nutraceutical>
          )
        );
      })}
    </Container>
  );
};

export default Nutraceuticals;
