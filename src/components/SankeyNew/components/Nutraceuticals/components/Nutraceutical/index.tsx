import React from 'react';
import ReactToolTip from 'react-tooltip';
import { Scrollbar } from 'react-scrollbars-custom';
import Popup from 'reactjs-popup';
import { FiRefreshCcw } from 'react-icons/fi';
import { FaInfoCircle } from 'react-icons/fa';

import Container, {
  Anchors,
  Anchor,
  Content,
  ContentPopup,
  ContentTitle,
  ContentDescription,
} from './styles';

import { useSankey } from '../../../../../../contexts/sankey';

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
  const context = useSankey();
  const { connections } = context;

  const supConnections = Object.entries(connections).map(({ 1: connection }) =>
    Object.entries(connection).filter(({ 1: subconnection }) =>
      Array.isArray(subconnection) ? subconnection.includes(id) : false,
    ),
  );

  return (
    <Container>
      <Anchors>
        {Object.values(supConnections)
          .filter(supConnection => !!supConnection.length)
          .filter(
            (supConnection, index, array) =>
              array.indexOf(supConnection) === index,
          )
          .map(supConnection => {
            const { 0: suboutcome } = supConnection[0];

            return (
              <Anchor key={`${id}-${suboutcome}`} id={`${id}-${suboutcome}`} />
            );
          })}
      </Anchors>
      <Content>
        <Popup
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
              <h3>{title}</h3>
              <p>{description}</p>
              <a
                href={`https://www.healthprotection.com/nutraceuticals/${id}`}
                target="_blank"
                rel="noreferrer"
              >
                Access 227 scientific studies
              </a>
              {/* <PopupList>
                {nutraceutic.parents.map(parent => {
                  const selectedParent = Object.values(suboutcomes).find(
                    suboutcome => suboutcome.key === parent,
                  );
                  return (
                    <div key={`popup-${parent}`} className="list-item">
                      <h4>
                        <strong>{nutraceutic.title}</strong> for{' '}
                        {selectedParent?.title}
                      </h4>
                      <h5>These data summarize XX scientific studies</h5>
                      <PopupListIcons>
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
                      </PopupListIcons>
                      <p>{selectedParent?.description}</p>
                      <a href="#2">Read each of the scientific studies</a>
                    </div>
                  );
                })}
              </PopupList> */}
            </ContentPopup>
          </Scrollbar>
        </Popup>
        <ContentTitle>{title}</ContentTitle>
        <ContentDescription>{`${dosage} ${unit}`}</ContentDescription>
      </Content>
      <FiRefreshCcw
        className="refresh-icon"
        size={20}
        color="#000"
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
        backgroundColor="#000"
      />
    </Container>
  );
};

export default Nutraceutical;
