import React, { useState, useCallback } from 'react';
import Xarrow from 'react-xarrows';
import { HiQuestionMarkCircle } from 'react-icons/hi';
import { transparentize } from 'polished';

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
  const context = useSankey();
  const { connections, updateConnections } = context;

  const [fineTune, setFineTune] = useState<FineTuneProps>({});

  const outcomeConnection =
    Object.values(connections).find(connection =>
      Object.keys(connection).includes(id),
    ) || {};

  const suboutcomeConnection = Object.entries(outcomeConnection).find(
    ({ 0: suboutcome }) => suboutcome === id,
  );

  const { 1: subConnections } = suboutcomeConnection || [];

  const subConnectionsQuantity = subConnections?.length || 1;

  const handleFineTuneClick = useCallback(
    async (fineTuneGroup, suboutcome) => {
      updateConnections(suboutcome, fineTuneGroup);
    },
    [updateConnections],
  );

  return (
    <Container
      id={id}
      color={color}
      isActive={fineTune[id] !== undefined && fineTune[id] !== 'off'}
      connections={subConnectionsQuantity}
    >
      <Anchors className="entry-anchors">
        {/* {outcomeConnections.map(({ 0: key }) => (
          <Anchor key={`${id}-${key}`} id={`${id}-${key}`} />
        ))} */}
      </Anchors>
      <Anchors className="exit-anchors">
        {subConnections &&
          subConnections.map(subConnection => (
            <>
              <Anchor
                key={`${id}-${subConnection}`}
                id={`${id}-${subConnection}`}
              />
              <Xarrow
                start={`${id}-${subConnection}`}
                end={`${subConnection}-${id}`}
                showHead={false}
                strokeWidth={58}
                curveness={0.6}
                startAnchor="right"
                endAnchor="left"
                color={
                  subConnectionsQuantity
                    ? transparentize(0.8, color)
                    : 'rgba(0,0,0,0.05)'
                }
              />
            </>
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
