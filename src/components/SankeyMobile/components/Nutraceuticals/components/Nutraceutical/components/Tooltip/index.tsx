import React from 'react';
import ReactHtmlParser from 'react-html-parser';

import { useApp } from 'contexts/app';

import Container, {
  ContainerTitle,
  ContainerDescription,
  ContainerLink,
  ContainerList,
  ContainerListItem,
  ContainerListItemTitle,
  ContainerListItemDetails,
  ContainerListItemDescription,
  ContainerListItemLink,
  ContainerListIcons,
} from './styles';

interface TooltipProps {
  slug: string;
  title: string;
  description: string;
  supConnections: string[];
}

const Tooltip: React.FC<TooltipProps> = ({
  slug,
  title,
  description,
  supConnections,
}) => {
  const context = useApp();
  const { outcomes, suboutcomes } = context;

  return (
    <Container>
      <ContainerTitle>{title}</ContainerTitle>
      <ContainerDescription>
        {ReactHtmlParser(description)}
      </ContainerDescription>
      <ContainerLink
        href={`https://www.healthprotection.com/nutraceuticals/${slug}`}
        target="_blank"
        rel="noreferrer"
      >
        Access 227 scientific studies
      </ContainerLink>
      <ContainerList>
        {supConnections.map(supConnection => {
          const selectedSuboutcome = Object.values(suboutcomes).find(
            suboutcome => suboutcome.id === supConnection,
          );

          const selectedOutcome =
            selectedSuboutcome &&
            outcomes.find(outcome =>
              outcome.suboutcomes.includes(selectedSuboutcome.id),
            );

          return (
            <ContainerListItem key={`popup-${supConnection}`}>
              <ContainerListItemTitle>
                <strong>{selectedSuboutcome?.title}</strong> for{' '}
                {selectedOutcome?.title}
              </ContainerListItemTitle>
              <ContainerListItemDetails>
                These data summarize XX scientific studies
              </ContainerListItemDetails>
              <ContainerListIcons>
                <div className="icon-wrapper">
                  <strong>Level of Evidence</strong>
                  <div className="icon-content">
                    <img
                      src={`${process.env.PUBLIC_URL}/icons/evidence+3.svg`}
                      alt=""
                      height="24"
                    />
                    <span>High</span>
                  </div>
                </div>
                <div className="icon-wrapper">
                  <strong>Magnitude of Effect</strong>
                  <div className="icon-content">
                    <img
                      src={`${process.env.PUBLIC_URL}/icons/magnitude+2.svg`}
                      alt=""
                      height="24"
                    />
                    <span>Notable</span>
                  </div>
                </div>
              </ContainerListIcons>
              <ContainerListItemDescription>
                {selectedSuboutcome?.description}
              </ContainerListItemDescription>
              <ContainerListItemLink href="#2">
                Read each of the scientific studies
              </ContainerListItemLink>
            </ContainerListItem>
          );
        })}
      </ContainerList>
    </Container>
  );
};

export default Tooltip;
