import React from 'react';
import { Scrollbar } from 'react-scrollbars-custom';
import Popup from 'reactjs-popup';

import { useApp } from 'contexts/app';

import NutraceuticalData from 'dtos/NutraceuticalData';

import { ReactComponent as NutritionInfoIcon } from 'assets/nutrition_info.svg';

import Tooltip from './components/Tooltip';

import Container, {
  Anchors,
  Anchor,
  ContentContainer,
  Content,
  ContentTitle,
  ContentDescription,
} from './styles';

const Nutraceutical: React.FC<NutraceuticalData> = ({
  slug,
  title,
  dosage,
  info,
}) => {
  const appContext = useApp();
  const { connections } = appContext;

  const { description } = info;

  const supConnections = Object.values(connections)
    .filter(
      subconnections =>
        !!Object.values(subconnections).reduce(
          (accumulator, subconnection) => accumulator + subconnection.length,
          0,
        ),
    )
    .reduce(
      (accumulator: string[], subconnections) => [
        ...accumulator,
        ...Object.entries(subconnections)
          .filter(({ 1: subconnection }) => subconnection.includes(slug))
          .reduce((acc: string[], curr) => [...acc, curr[0]], []),
      ],
      [],
    );

  return (
    <Container connections={supConnections.length}>
      <Anchors>
        {supConnections.map(supConnection => (
          <Anchor
            key={`${slug}-${supConnection}`}
            id={`${slug}-${supConnection}`}
          />
        ))}
      </Anchors>
      <ContentContainer>
        <Popup
          trigger={
            <Content>
              <NutritionInfoIcon />
              <ContentTitle>{title}</ContentTitle>
              <ContentDescription>{`${dosage}`}</ContentDescription>
            </Content>
          }
          modal
          nested
        >
          <Scrollbar style={{ height: 'calc(100vh - 80px)' }}>
            <Tooltip
              {...{
                ...{ slug, title, description, supConnections },
              }}
            />
          </Scrollbar>
        </Popup>
      </ContentContainer>
    </Container>
  );
};

export default Nutraceutical;
