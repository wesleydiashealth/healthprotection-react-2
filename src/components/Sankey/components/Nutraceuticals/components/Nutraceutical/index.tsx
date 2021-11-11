import React, { useState, useEffect } from 'react';
import { Scrollbar } from 'react-scrollbars-custom';

import { useApp } from 'contexts/app';

import NutraceuticalData from 'dtos/NutraceuticalData';

import { ReactComponent as NutritionInfoIcon } from 'assets/nutrition_info.svg';

import Tooltip from './components/Tooltip';

import Container, {
  ContainerPopup,
  ContainerCloseButton,
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

  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onScroll = (e: any) => {
      setScrollTop(e.target.documentElement.scrollTop);
    };

    window.addEventListener('scroll', onScroll);
  }, [scrollTop]);

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
        <ContainerPopup
          open={open}
          closeOnDocumentClick
          onClose={closeModal}
          offsetTop={scrollTop}
          trigger={
            <Content onClick={() => setOpen(o => !o)}>
              <NutritionInfoIcon />
              <ContentTitle>{title}</ContentTitle>
              <ContentDescription>{`${dosage}`}</ContentDescription>
            </Content>
          }
          modal
          nested
        >
          <Scrollbar style={{ height: '600px' }}>
            <ContainerCloseButton size={24} onClick={() => setOpen(o => !o)} />
            <Tooltip
              {...{
                ...{ slug, title, description, supConnections },
              }}
            />
          </Scrollbar>
        </ContainerPopup>
      </ContentContainer>
    </Container>
  );
};

export default Nutraceutical;
