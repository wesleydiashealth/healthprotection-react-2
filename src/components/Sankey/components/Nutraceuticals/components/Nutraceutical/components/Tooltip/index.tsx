import React from 'react';

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

const Tooltip: React.FC<TooltipProps> = ({ slug, supConnections }) => {
  const context = useApp();
  const { nutraceuticals } = context;

  const nutraceutical = nutraceuticals.find(item => item.slug === slug);

  return (
    <Container>
      <ContainerTitle>{nutraceutical?.info.title}</ContainerTitle>
      <ContainerDescription>
        {nutraceutical?.info.description}
      </ContainerDescription>
      <ContainerLink
        href={nutraceutical?.info.link}
        target="_blank"
        rel="noreferrer"
      >
        {`Access ${nutraceutical?.info.studies} scientific studies`}
      </ContainerLink>
      <ContainerList>
        {nutraceutical?.info.relations
          .filter(relation => supConnections.includes(relation.suboutcome.slug))
          .map(relation => (
            <ContainerListItem key={relation.slug}>
              <ContainerListItemTitle>
                <strong>{relation.suboutcome.title}</strong> for{' '}
                {relation.outcome.title}
              </ContainerListItemTitle>
              <ContainerListItemDetails>
                {`These data summarize ${relation.studies} scientific studies`}
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
                {relation?.description}
              </ContainerListItemDescription>
              <ContainerListItemLink href={relation.link} target="_blank">
                Read each of the scientific studies
              </ContainerListItemLink>
            </ContainerListItem>
          ))}
      </ContainerList>
    </Container>
  );
};

export default Tooltip;
