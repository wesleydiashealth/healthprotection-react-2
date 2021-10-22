import React from 'react';

import { useApp } from 'contexts/app';

import { ReactComponent as NutritionInfoIcon } from 'assets/nutrition_info.svg';
import Nutraceutical from './components/Nutraceutical';

import Container, { ContainerLabel } from './styles';

const Nutraceuticals: React.FC = () => {
  const appContext = useApp();
  const { connections, nutraceuticals, selectedNutraceuticals } = appContext;

  return (
    <Container isActive={!!selectedNutraceuticals.length}>
      {!!selectedNutraceuticals.length && (
        <ContainerLabel>
          Click on <NutritionInfoIcon /> for Scientific foundation
        </ContainerLabel>
      )}

      {Array.from(
        new Set(
          Object.values(connections).reduce(
            (acc: string[], connection) => [
              ...acc,
              ...Object.values(connection).reduce(
                (subAcc, subCurr) => [...subAcc, ...subCurr],
                [],
              ),
            ],
            [],
          ),
        ),
      ).map(connection => {
        const nutraceutical = nutraceuticals.find(
          item => item.slug === connection,
        );

        return (
          nutraceutical && (
            <Nutraceutical key={nutraceutical.slug} {...nutraceutical}>
              {nutraceutical.title}
            </Nutraceutical>
          )
        );
      })}

      {/* {selectedNutraceuticals.map(selectedNutraceutical => {
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
      })} */}
    </Container>
  );
};

export default Nutraceuticals;
