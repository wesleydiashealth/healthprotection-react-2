import React from 'react';
// import Xarrow from 'react-xarrows';
import { HiQuestionMarkCircle } from 'react-icons/hi';

import Container, {
  Anchors,
  Anchor,
  Content,
  ContentIcon,
  ContentTitle,
} from './styles';

import { useSankey } from '../../../../contexts/sankey';

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

  const outcomeConnections = Object.entries(connections)
    .filter(connection => connection[0] === id)
    .reduce((acc, curr) => {
      const { 1: value } = curr;

      return acc + Object.values(value).length;
    }, 0);

  return (
    <Container id={id} color={color} connections={outcomeConnections}>
      <Anchors>
        <Anchor id={`${id}`} />
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
