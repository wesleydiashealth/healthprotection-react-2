import React from 'react';

// import { useSankey } from 'contexts/sankey';

import Container, {
  ContainerTitle,
  ContainerDescription,
  ContainerLink,
  ContainerList,
  // ContainerListIcons,
} from './styles';

interface TooltipProps {
  id: string;
  title: string;
  description: string;
  supConnections: string[];
}

const Tooltip: React.FC<TooltipProps> = ({
  id,
  title,
  description,
  // supConnections,
}) => {
  // const context = useSankey();
  // const { outcomes, suboutcomes } = context;

  return (
    <Container>
      <ContainerTitle>{title}</ContainerTitle>
      <ContainerDescription>{description}</ContainerDescription>
      <ContainerLink
        href={`https://www.healthprotection.com/nutraceuticals/${id}`}
        target="_blank"
        rel="noreferrer"
      >
        Access 227 scientific studies
      </ContainerLink>
      <ContainerList>
        {/* {supConnections.map(supConnection => {
          const selectedSuboutcome = Object.values(suboutcomes).find(
            suboutcome => suboutcome.id === supConnection,
          );

          const selectedOutcome =
            selectedSuboutcome &&
            outcomes.find(outcome =>
              outcome.suboutcomes.includes(selectedSuboutcome.id),
            );

          return (
            <div key={`popup-${supConnection}`} className="list-item">
              <h4>
                <strong>{selectedSuboutcome?.title}</strong> for{' '}
                {selectedOutcome?.title}
              </h4>
              <h5>These data summarize XX scientific studies</h5>
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
              <p>{selectedSuboutcome?.description}</p>
              <a href="#2">Read each of the scientific studies</a>
            </div>
          );
        })} */}
      </ContainerList>
    </Container>
  );
};

export default Tooltip;
