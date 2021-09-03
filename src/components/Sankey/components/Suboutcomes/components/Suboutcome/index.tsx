import React, { useState, useCallback } from 'react';
import Xarrow from 'react-xarrows';
import { HiQuestionMarkCircle } from 'react-icons/hi';
import { transparentize } from 'polished';

import { useApp } from 'contexts/app';
import { useSankey } from 'contexts/sankey';

import Container, {
  Anchors,
  Anchor,
  Content,
  ContentTitle,
  FineTuneGroup,
  FineTune,
} from './styles';

interface SuboutcomeProps {
  id: string;
  title: string;
  color: string;
  description: string;
  nutraceuticals: {
    min: string[];
    med: string[];
    max: string[];
  };
}

interface FineTuneProps {
  [key: string]: string;
}

const Suboutcome: React.FC<SuboutcomeProps> = ({
  id,
  title,
  color,
  description,
  nutraceuticals,
}) => {
  const appContext = useApp();

  const sankeyContext = useSankey();
  const { connections, updateConnections } = sankeyContext;

  const [fineTune, setFineTune] = useState<FineTuneProps>({});

  const supConnections = Object.entries(connections)
    .filter(({ 1: subconnections }) => Object.keys(subconnections).includes(id))
    .reduce((acc: string[], { 0: outcome, 1: suboutcomes }) => {
      const subconnections = Object.entries(suboutcomes)
        .filter(({ 0: subconnection }) => subconnection.includes(id))
        .reduce(
          (acc2: string[], { 1: subconnectionNutraceuticals }) => [
            ...acc2,
            ...subconnectionNutraceuticals.map(
              subconnectionNutraceutical =>
                `${subconnectionNutraceutical}_${id}_${outcome}`,
            ),
          ],
          [],
        );

      return subconnections.length
        ? [...acc, ...subconnections]
        : [...acc, `${id}_${outcome}`];
    }, []);

  const subConnections = Object.values(connections)
    .filter(subconnections => Object.keys(subconnections).includes(id))
    .reduce(
      (accumulator: string[], subconnections) => [
        ...accumulator,
        ...Object.entries(subconnections)
          .filter(({ 0: subconnection }) => subconnection === id)
          .reduce(
            (subAccumulator: string[], { 1: subconnection }) => [
              ...subAccumulator,
              ...subconnection,
            ],
            [],
          ),
      ],
      [],
    );

  const handleFineTuneClick = useCallback(
    async (fineTuneGroup, suboutcome) => {
      updateConnections(suboutcome, fineTuneGroup);

      appContext.updateStep('step2', { isCompleted: true });
    },
    [updateConnections, appContext],
  );

  return (
    <Container
      id={id}
      color={color}
      isActive={fineTune[id] !== undefined && fineTune[id] !== 'off'}
      connections={supConnections.length}
    >
      <Anchors className="entry-anchors">
        {supConnections.map(supConnection => (
          <Anchor key={`${supConnection}`} id={`${supConnection}`} />
        ))}
      </Anchors>
      <Anchors className="exit-anchors">
        {subConnections &&
          subConnections.map(subConnection => (
            <React.Fragment key={`${id}-${subConnection}`}>
              <Anchor id={`${id}-${subConnection}`} />
              <Xarrow
                start={`${id}-${subConnection}`}
                end={`${subConnection}-${id}`}
                showHead={false}
                strokeWidth={58}
                curveness={0.6}
                startAnchor="right"
                endAnchor="left"
                color={
                  subConnections.length
                    ? transparentize(0.8, color)
                    : 'rgba(0,0,0,0.05)'
                }
              />
            </React.Fragment>
          ))}
      </Anchors>
      <Content>
        <HiQuestionMarkCircle
          size={20}
          color="rgba(0,0,0,0.7)"
          data-tip={`<strong>${title}</strong><span>${description}</span>`}
          data-for="sankey-tooltip"
          className="tooltip-icon"
        />
        <ContentTitle>{title}</ContentTitle>
      </Content>
      <FineTuneGroup>
        <FineTune
          isActive={fineTune[id] === 'off' || !fineTune[id]}
          color={color}
          onClick={() => {
            handleFineTuneClick([], id);
            setFineTune({ ...fineTune, [id]: 'off' });
          }}
        >
          Off
        </FineTune>
        {Object.entries(nutraceuticals).map(({ 0: key, 1: value }) => (
          <FineTune
            key={key}
            isActive={fineTune[id] === key}
            isEmpty={!value.length}
            color={color}
            onClick={() => {
              if (value.length) {
                handleFineTuneClick(value, id);
                setFineTune({ ...fineTune, [id]: key });
              }
            }}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </FineTune>
        ))}
      </FineTuneGroup>
    </Container>
  );
};

export default Suboutcome;
