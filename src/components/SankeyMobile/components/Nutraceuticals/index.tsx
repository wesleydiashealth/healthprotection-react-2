import React from 'react';

import { useApp } from 'contexts/app';

import { ReactComponent as NutritionInfoIcon } from 'assets/nutrition_info.svg';
import Nutraceutical from './components/Nutraceutical';

import Container, { ContainerLabel } from './styles';

const Nutraceuticals: React.FC = () => {
  const appContext = useApp();
  const { connections, nutraceuticals } = appContext;

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
      {!!selectedNutraceuticals.length && (
        <ContainerLabel>
          Click on <NutritionInfoIcon />
          <br />
          for Scientific foundation
        </ContainerLabel>
      )}
      {selectedNutraceuticals.map(selectedNutraceutical => {
        const nutraceutical = nutraceuticals.find(
          item => item.slug === selectedNutraceutical,
        );

        return (
          nutraceutical && (
            <Nutraceutical key={nutraceutical.slug} {...nutraceutical}>
              {nutraceutical.title}
            </Nutraceutical>
          )
        );
      })}
    </Container>
  );
};

export default Nutraceuticals;
