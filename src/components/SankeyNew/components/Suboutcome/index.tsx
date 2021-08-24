import React, { useState, useCallback } from 'react';
// import Xarrow from 'react-xarrows';
import { HiQuestionMarkCircle } from 'react-icons/hi';

import { useSankey } from '../../../../contexts/sankey';

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
  description,
  nutraceuticals,
}) => {
  const context = useSankey();
  const { updateConnections } = context;

  const [fineTune, setFineTune] = useState<FineTuneProps>({});

  const handleFineTuneClick = useCallback(
    async (fineTuneGroup, suboutcome) => {
      updateConnections(suboutcome, fineTuneGroup);
    },
    [updateConnections],
  );

  return (
    <Container id={id}>
      <Anchors>
        <Anchor id={`${id}`} />
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
          color="red"
          onClick={() => {
            handleFineTuneClick([], id);
            setFineTune({ ...fineTune, [id]: 'off' });
          }}
        >
          Off
        </FineTune>
        {Object.entries(nutraceuticals)
          .filter(nutraceutical => !!nutraceutical[1].length)
          .map(nutraceutical => {
            const { 0: key, 1: value } = nutraceutical;

            return (
              <FineTune
                key={key}
                isActive={fineTune[id] === key}
                color="green"
                onClick={() => {
                  handleFineTuneClick(value, id);
                  setFineTune({ ...fineTune, [id]: key });
                }}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </FineTune>
            );
          })}
      </FineTuneGroup>
    </Container>
  );
};

export default Suboutcome;
