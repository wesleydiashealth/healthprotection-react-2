import React, { useState, useCallback } from 'react';
import Xarrow from 'react-xarrows';
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
  color?: string;
  description: string;
  nutraceuticals: {
    min: string[];
    med: string[];
    max: string[];
  };
  outcome: string;
}

interface FineTuneProps {
  [key: string]: string;
}

const Suboutcome: React.FC<SuboutcomeProps> = ({
  id,
  title,
  color = '#000',
  nutraceuticals,
  outcome,
}) => {
  const appContext = useApp();
  const { connections, updateConnections } = appContext;

  const sankeyContext = useSankey();
  const { activeAccordions } = sankeyContext;

  const [fineTune, setFineTune] = useState<FineTuneProps>({});

  const subConnections = Object.values(connections)
    .filter(connection => Object.keys(connection).includes(id))
    .reduce((acc: string[], connection) => {
      const subconnections = Object.entries(connection).find(
        ({ 0: subconnection }) => subconnection === id,
      );

      return subconnections ? [...acc, ...subconnections[1]] : acc;
    }, []);

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
    >
      <Content>
        {/* <HiQuestionMarkCircle
          size={20}
          color="rgba(0,0,0,0.7)"
          data-tip={`<strong>${title}</strong><span>${description}</span>`}
          data-for="sankey-tooltip"
          className="tooltip-icon"
        /> */}
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
        <Anchors className="exit-anchors">
          {activeAccordions.includes(outcome) &&
            subConnections.map(subConnection => (
              <React.Fragment key={`${id}-${subConnection}`}>
                <Anchor id={`${id}-${subConnection}`} />
                <Xarrow
                  start={`${id}-${subConnection}`}
                  end={`${subConnection}-${id}`}
                  showHead={false}
                  strokeWidth={28}
                  curveness={0.8}
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
      </FineTuneGroup>
    </Container>
  );
};

export default Suboutcome;
