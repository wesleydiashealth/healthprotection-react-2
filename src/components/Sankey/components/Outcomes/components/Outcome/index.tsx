import React from 'react';
import Xarrow from 'react-xarrows';
import { HiQuestionMarkCircle } from 'react-icons/hi';
import { transparentize } from 'polished';

import { useSankey } from 'contexts/sankey';
import Container, {
  Anchors,
  Anchor,
  Content,
  ContentIcon,
  ContentTitle,
} from './styles';

interface OutcomeProps {
  id: string;
  title: string;
  color: string;
  description: string;
  suboutcomes: string[];
}

const Outcome: React.FC<OutcomeProps> = ({ id, title, color, description }) => {
  const context = useSankey();
  const { connections } = context;

  const subConnections = Object.entries(connections)
    .filter(({ 0: connection }) => connection.includes(id))
    .reduce((accumulator: string[], { 1: suboutcomes }) => {
      const subconnections = Object.entries(suboutcomes).reduce(
        (subAccumulator: string[], { 0: suboutcome, 1: nutraceuticals }) =>
          nutraceuticals.length
            ? [
                ...subAccumulator,
                ...nutraceuticals.map(
                  nutraceutical => `${suboutcome}_${nutraceutical}`,
                ),
              ]
            : [...subAccumulator, suboutcome],
        [],
      );

      return subconnections.length
        ? [...accumulator, ...subconnections]
        : [...accumulator, ...Object.keys(suboutcomes)];
    }, []);

  const subConnectionsActive = Object.entries(connections)
    .filter(({ 0: connection }) => connection === id)
    .reduce((accumulator: string[], { 1: subconnections }) => {
      const suboutcomeConnections = Object.entries(subconnections).reduce(
        (
          subAccumulator: string[],
          { 0: suboutcome, 1: suboutcomeNutraceuticals },
        ) =>
          (suboutcomeNutraceuticals.length && [
            ...subAccumulator,
            suboutcome,
          ]) || [...subAccumulator],
        [],
      );

      return [...accumulator, ...suboutcomeConnections];
    }, []);

  return (
    <Container id={id} color={color} connections={subConnections.length}>
      <Anchors>
        {subConnections.map(subConnection => (
          <React.Fragment key={`${id}_${subConnection}`}>
            <Anchor id={`${id}_${subConnection}`} />
            <Xarrow
              start={`${id}_${subConnection}`}
              end={`${subConnection.split('_').reverse().join('_')}_${id}`}
              showHead={false}
              strokeWidth={58}
              curveness={0.6}
              startAnchor="right"
              endAnchor="left"
              color={
                subConnectionsActive.includes(subConnection.split('_')[0])
                  ? transparentize(0.8, color)
                  : 'rgba(0,0,0,0.05)'
              }
            />
          </React.Fragment>
        ))}
      </Anchors>
      <Content>
        <ContentIcon
          src={`${process.env.PUBLIC_URL}/icons/outcomes/${id}.svg`}
          alt={title}
          width={36}
        />
        <ContentTitle>{title}</ContentTitle>
        <HiQuestionMarkCircle
          size={20}
          color="rgba(0,0,0,0.7)"
          data-tip={`<strong>${title}</strong><span>${description}</span>`}
          data-for="sankey-tooltip"
          className="tooltip-icon"
        />
      </Content>
    </Container>
  );
};

export default Outcome;
