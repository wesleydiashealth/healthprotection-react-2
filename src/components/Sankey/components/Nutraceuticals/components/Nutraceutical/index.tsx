import React from 'react';
import ReactDOMServer from 'react-dom/server';
import ReactToolTip from 'react-tooltip';
import { HiQuestionMarkCircle } from 'react-icons/hi';

import { useApp } from 'contexts/app';

import Tooltip from './components/Tooltip';

import Container, {
  Anchors,
  Anchor,
  Content,
  ContentTitle,
  ContentDescription,
} from './styles';

interface NutraceuticalProps {
  id: string;
  title: string;
  dosage: number;
  unit: string;
  description: string;
}

const Nutraceutical: React.FC<NutraceuticalProps> = ({
  id,
  title,
  dosage,
  unit,
  description,
}) => {
  const appContext = useApp();
  const { connections } = appContext;

  const supConnections = Object.values(connections)
    .filter(
      subconnections =>
        !!Object.values(subconnections).reduce(
          (accumulator, subconnection) => accumulator + subconnection.length,
          0,
        ),
    )
    .reduce(
      (accumulator: string[], subconnections) => [
        ...accumulator,
        ...Object.entries(subconnections)
          .filter(({ 1: subconnection }) => subconnection.includes(id))
          .reduce((acc: string[], curr) => [...acc, curr[0]], []),
      ],
      [],
    );

  return (
    <Container connections={supConnections.length}>
      <Anchors>
        {supConnections.map(supConnection => (
          <Anchor
            key={`${id}-${supConnection}`}
            id={`${id}-${supConnection}`}
          />
        ))}
      </Anchors>
      <Content
        data-tip={ReactDOMServer.renderToStaticMarkup(
          <Tooltip
            {...{
              ...{ id, title, description, supConnections },
            }}
          />,
        )}
        data-for={`${id}-tooltip`}
      >
        {/* <Popup
          trigger={
            <FaInfoCircle
              className="tooltip-icon"
              size={20}
              color="rgba(0,0,0,0.7)"
              data-tip={`${title}`}
              data-for={`sankey-${id}-tooltip`}
            />
          }
          modal
          nested
        >
          <Scrollbar style={{ height: 'calc(100vh - 80px)' }}>
            <ContentPopup>
              <ContentPopupTitle>{title}</ContentPopupTitle>
              <ContentPopupDescription>{description}</ContentPopupDescription>
              <ContentPopupLink
                href={`https://www.healthprotection.com/nutraceuticals/${id}`}
                target="_blank"
                rel="noreferrer"
              >
                Access 227 scientific studies
              </ContentPopupLink>
              <ContentPopupList>
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
                    <div key={`popup-${supConnection}`} className="list-item">
                      <h4>
                        <strong>{selectedSuboutcome?.title}</strong> for{' '}
                        {selectedOutcome?.title}
                      </h4>
                      <h5>These data summarize XX scientific studies</h5>
                      <ContentPopupListIcons>
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
                      </ContentPopupListIcons>
                      <p>{selectedSuboutcome?.description}</p>
                      <a href="#2">Read each of the scientific studies</a>
                    </div>
                  );
                })}
              </ContentPopupList>
            </ContentPopup>
          </Scrollbar>
        </Popup> */}
        <HiQuestionMarkCircle
          className="tooltip-icon"
          size={20}
          color="rgba(0,0,0,0.7)"
        />
        <ContentTitle>{title}</ContentTitle>
        <ContentDescription>{`${dosage} ${unit}`}</ContentDescription>
      </Content>
      <ReactToolTip
        id={`${id}-tooltip`}
        place="left"
        type="light"
        effect="solid"
        html
        backgroundColor="#fff"
      />
      {/* <FiRefreshCcw
        className="refresh-icon"
        size={20}
        color="#fff"
        data-tip={`${title}`}
        data-for={`sankey-${id}-refresh`}
      />
      <ReactToolTip
        id={`sankey-${id}-refresh`}
        className={`sankey-${id}-refresh`}
        place="bottom"
        type="light"
        effect="solid"
        offset={{ top: 10, left: 10 }}
        html
        backgroundColor="#fff"
      /> */}
    </Container>
  );
};

export default Nutraceutical;
