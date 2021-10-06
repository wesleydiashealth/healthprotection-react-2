import React, { useCallback } from 'react';
import Xarrow from 'react-xarrows';
import { transparentize } from 'polished';
import { FiChevronDown } from 'react-icons/fi';

import { useApp } from 'contexts/app';
import { useSankey } from 'contexts/sankey';

import OutcomeData from 'dtos/OutcomeData';
import Suboutcomes from '../../../Suboutcomes';
import Container, {
  Content,
  ContentIcon,
  ContentTitle,
  Anchors,
  Anchor,
} from './styles';

const Outcome: React.FC<OutcomeData> = ({
  id,
  title,
  color,
  suboutcomes,
  icon,
}) => {
  const appContext = useApp();
  const { connections } = appContext;

  const context = useSankey();
  const { activeAccordions, updateActiveAccordions } = context;

  const subConnections = Object.entries(connections)
    .filter(({ 0: connection }) => connection.includes(id))
    .reduce((accumulator: string[], { 1: connectionSuboutcomes }) => {
      const subconnections = Object.entries(connectionSuboutcomes).reduce(
        (subAccumulator: string[], { 1: nutraceuticals }) =>
          nutraceuticals.length
            ? [
                ...subAccumulator,
                ...nutraceuticals.map(nutraceutical => `${nutraceutical}`),
              ]
            : [...subAccumulator],
        [],
      );

      return subconnections.length ? [...accumulator, ...subconnections] : [];
    }, []);

  const handleAccordionClick = useCallback(
    async outcome => {
      updateActiveAccordions(outcome);
    },
    [updateActiveAccordions],
  );

  return (
    <Container
      onChange={() => {
        handleAccordionClick(id);
      }}
      id={id}
    >
      <Content
        isActive={!!activeAccordions.includes(id)}
        color={color}
        expandIcon={<FiChevronDown color="#000" />}
      >
        <ContentIcon src={icon} alt={title} />
        <ContentTitle>{title}</ContentTitle>
        {!activeAccordions.includes(id) && !!subConnections.length && (
          <Anchors>
            {subConnections.map(subConnection => (
              <React.Fragment key={subConnection}>
                <Anchor id={`${id}-${subConnection}`} />
                <Xarrow
                  start={`${id}-${subConnection}`}
                  end={`${subConnection}-${id}`}
                  showHead={false}
                  strokeWidth={14}
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
        )}
      </Content>
      {!!suboutcomes.length && (
        <Suboutcomes
          color={color}
          outcome={id}
          outcomeSuboutcomes={suboutcomes}
        />
      )}
    </Container>
  );
};

export default Outcome;
