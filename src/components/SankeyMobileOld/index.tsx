import React, { useState, useCallback } from 'react';
import ReactToolTip from 'react-tooltip';
import { Scrollbar } from 'react-scrollbars-custom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { HiQuestionMarkCircle, HiLockClosed } from 'react-icons/hi';
import { FiRefreshCcw, FiChevronDown } from 'react-icons/fi';
import Xarrow from 'react-xarrows';
import { IoOptionsOutline } from 'react-icons/io5';
import { transparentize } from 'polished';

import Container, {
  StepIntro,
  StepTitle,
  StepDescription,
  StepSubDescription,
  StepContent,
  Outcomes,
  Outcome,
  OutcomeContent,
  OutcomeName,
  OutcomeList,
  Substances,
  Substance,
  FineTuneGroup,
  FineTune,
  PopupContent,
  PopupList,
  PopupListIcons,
} from './styles';

import { useApp } from '../../contexts/app';

import sankeyData from '../../sankey2.json';

interface FineTune {
  [key: string]: string;
}

interface Substance {
  key: string;
  title: string;
  dosage: string;
  unit: string;
  description: string;
  parents: Array<string>;
}

interface Connections {
  [key: string]: Connection;
}

interface Connection {
  [key: string]: string[];
}

const SankeyMobile: React.FC = () => {
  const context = useApp();
  const { steps } = context;
  const { step1: previousStep } = steps;

  previousStep.isCompleted = true;

  const { outcomes, suboutcomes } = sankeyData;

  const [fineTune, setFineTune] = useState<FineTune>({});
  const [nutraceutics, setNutraceutics] = useState<Substance[]>([]);

  const [connections, setConnections] = useState<Connections>(() => {
    const items = {};

    Object.values(outcomes).forEach(outcome => {
      const subItems = {};

      outcome.suboutcomes.forEach(suboutcome => {
        Object.assign(subItems, { [suboutcome]: [] });
      });

      Object.assign(items, { [outcome.key]: subItems });
    });

    return items;
  });

  const handleFineTuneClick = useCallback(
    async (items: Array<Substance>, suboutcome) => {
      const suboutcomeParents = Object.values(outcomes).filter(outcome =>
        outcome.suboutcomes.includes(suboutcome),
      );

      if (items.length) {
        const updatedNutraceutics = [...nutraceutics];

        updatedNutraceutics
          .filter(current => {
            return (
              items.filter(other => other.key === current.key).length === 0
            );
          })
          .map(nutraceutic => {
            const suboutcomeIndex = nutraceutic.parents.indexOf(suboutcome);

            if (suboutcomeIndex > -1) {
              nutraceutic.parents.splice(suboutcomeIndex, 1);
            }

            return nutraceutic;
          });

        Object.values(items).forEach(item => {
          const itemIndex = nutraceutics.findIndex(
            nutraceutic => nutraceutic.key === item.key,
          );

          if (itemIndex > -1) {
            setNutraceutics(
              nutraceutics
                .filter(nutraceutic => nutraceutic.key === item.key)
                .map(nutraceutic => {
                  const suboutcomeIndex =
                    nutraceutic.parents.indexOf(suboutcome);

                  if (suboutcomeIndex > -1) {
                    nutraceutic.parents.splice(suboutcomeIndex, 1, suboutcome);
                  } else {
                    nutraceutic.parents.push(suboutcome);
                  }

                  return nutraceutic;
                }),
            );
          } else {
            updatedNutraceutics.push(item);
          }

          suboutcomeParents.forEach(parent => {
            const connectionItems = connections[parent.key][suboutcome];

            const subItemIndex = connectionItems.indexOf(item.key);

            if (subItemIndex > -1) {
              connectionItems.splice(subItemIndex, 1, item.key);
            } else {
              connectionItems.push(item.key);
            }

            setConnections(connections);
          });
        });

        setNutraceutics(updatedNutraceutics);

        context.updateStep('step2', { isCompleted: true });
      } else {
        setNutraceutics(
          nutraceutics.map(nutraceutic => {
            const suboutcomeIndex = nutraceutic.parents.indexOf(suboutcome);

            if (suboutcomeIndex > -1) {
              nutraceutic.parents.splice(suboutcomeIndex, 1);
            }

            return nutraceutic;
          }),
        );

        suboutcomeParents.forEach(parent => {
          const connectionItems = connections[parent.key][suboutcome];

          connectionItems.splice(0, connectionItems.length);

          setConnections(connections);
        });

        context.updateStep('step2', { isCompleted: false });
      }
    },
    [nutraceutics, connections, outcomes, context],
  );

  return (
    <Container id="step_2" isActive={previousStep.isCompleted}>
      <StepIntro>
        <IoOptionsOutline
          size={52}
          color={previousStep.isCompleted ? '#DB71AF' : '#565656'}
        />
        <StepTitle>
          {!previousStep.isCompleted && (
            <>
              <HiLockClosed size={20} className="locked-icon" />
            </>
          )}
          Step 2
          <HiQuestionMarkCircle
            className="tooltip-icon"
            size={20}
            color={previousStep.isCompleted ? '#DB71AF' : '#565656'}
            data-tip="<strong>Step 2</strong><span>We already made a pre-selection...</span>"
            data-for="sankey-title-tooltip"
          />
          <ReactToolTip
            id="sankey-title-tooltip"
            className="sankey-title-tooltip"
            place="bottom"
            type="light"
            effect="solid"
            offset={{ top: 10, left: 10 }}
            html
            backgroundColor="#fff"
          />
        </StepTitle>

        {!previousStep.isCompleted && (
          <div className="step-disabled">
            <strong>Step Blocked.</strong>{' '}
            <span>Finish Step 1 to proceed.</span>
          </div>
        )}

        <StepDescription>
          <strong>Fine-tune</strong> your desired outcomes
        </StepDescription>
        <StepSubDescription>
          Click on the selected substances to explore scientific information.
        </StepSubDescription>
      </StepIntro>
      {previousStep.isCompleted && (
        <StepContent>
          <Outcomes>
            {Object.values(outcomes).map(outcome => {
              const connectionIndex = Object.keys(connections).findIndex(
                connection => connection === outcome.key,
              );

              const outcomeConnections =
                Object.values(connections)[connectionIndex];

              const connectionsQuantity = Object.values(
                outcomeConnections,
              ).reduce((acc, current) => {
                return acc + current.length;
              }, 0);

              const connectionsLength = Object.values(
                outcomeConnections,
              ).filter(connection => !!connection.length).length;

              return (
                <Outcome
                  key={outcome.key}
                  id={outcome.key}
                  color={outcome.color}
                  suboutcomes={
                    outcome.suboutcomes.length +
                    connectionsQuantity -
                    connectionsLength
                  }
                >
                  <OutcomeContent
                    expandIcon={<FiChevronDown color="#000" />}
                    className="outcome-wrapper"
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}/icons/outcomes/${outcome.key}.svg`}
                      alt={outcome.title}
                    />
                    <OutcomeName>
                      {outcome.title}
                      {/* <HiQuestionMarkCircle
                        size={20}
                        color="rgba(0,0,0,0.7)"
                        data-tip={`<strong>${outcome.title}</strong><span>${outcome.description}</span>`}
                        data-for="sankey-tooltip"
                        className="tooltip-icon"
                      /> */}
                    </OutcomeName>
                  </OutcomeContent>
                  <OutcomeList className="outcome-list">
                    {outcome.suboutcomes.map(suboutcome => {
                      const suboutcomeIndex = Object.keys(
                        suboutcomes,
                      ).findIndex(key => key === suboutcome);

                      const selectedSuboutcome =
                        Object.values(suboutcomes)[suboutcomeIndex];

                      const outcomeIndex = Object.values(outcomes).findIndex(
                        value =>
                          value.suboutcomes.includes(selectedSuboutcome.key),
                      );

                      return (
                        <div key={selectedSuboutcome.key} className="list-item">
                          <p>{selectedSuboutcome.title}</p>
                          <FineTuneGroup>
                            <div className="exit-anchors anchors">
                              <div
                                key={`${suboutcome}`}
                                id={`${suboutcome}`}
                                className="anchors__item"
                              />
                              {/* {nutraceutics
                              .filter(nutraceutic =>
                                nutraceutic.parents.includes(suboutcome),
                              )
                              .map(nutraceutic => (
                                <div
                                  key={`${suboutcome}-${nutraceutic.key}`}
                                  id={`${suboutcome}-${nutraceutic.key}`}
                                  className="anchors__item"
                                />
                              ))} */}
                            </div>
                            <FineTune
                              isActive={
                                fineTune[selectedSuboutcome.key] === 'off' ||
                                !fineTune[selectedSuboutcome.key]
                              }
                              color={
                                outcomeIndex > -1
                                  ? Object.values(outcomes)[outcomeIndex].color
                                  : '#565656'
                              }
                              onClick={() => {
                                handleFineTuneClick([], selectedSuboutcome.key);
                                setFineTune({
                                  ...fineTune,
                                  [selectedSuboutcome.key]: 'off',
                                });
                              }}
                            >
                              Off
                            </FineTune>
                            {Object.keys(selectedSuboutcome.sustances).map(
                              (key, index) => {
                                return (
                                  <FineTune
                                    key={key}
                                    isActive={
                                      fineTune[selectedSuboutcome.key] === key
                                    }
                                    color={
                                      outcomeIndex > -1
                                        ? Object.values(outcomes)[outcomeIndex]
                                            .color
                                        : '#565656'
                                    }
                                    onClick={() => {
                                      handleFineTuneClick(
                                        Object.values(
                                          selectedSuboutcome.sustances,
                                        )[index] || [],
                                        selectedSuboutcome.key,
                                      );

                                      setFineTune({
                                        ...fineTune,
                                        [selectedSuboutcome.key]: key,
                                      });
                                    }}
                                  >
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                  </FineTune>
                                );
                              },
                            )}
                          </FineTuneGroup>
                        </div>
                      );
                    })}
                  </OutcomeList>
                </Outcome>
              );
            })}
          </Outcomes>

          <Substances
            isActive={
              nutraceutics.filter(nutraceutic => nutraceutic.parents.length)
                .length > 0
            }
          >
            {nutraceutics
              .filter(nutraceutic => nutraceutic.parents.length)
              .map(nutraceutic => {
                return (
                  <Substance
                    key={nutraceutic.key}
                    id={nutraceutic.key}
                    suboutcomes={nutraceutic.parents.length}
                  >
                    <div className="content">
                      <div className="content-inner">
                        <Popup
                          trigger={
                            <HiQuestionMarkCircle
                              className="tooltip-icon"
                              size={14}
                              color="rgba(0,0,0,0.7)"
                              data-tip={`${nutraceutic.title}`}
                              data-for={`sankey-${nutraceutic.key}-tooltip`}
                            />
                          }
                          modal
                          nested
                        >
                          <Scrollbar style={{ height: 'calc(100vh - 80px)' }}>
                            <PopupContent>
                              <h3>{nutraceutic.title}</h3>
                              <p>{nutraceutic.description}</p>
                              <a
                                href={`https://www.healthprotection.com/nutraceuticals/${nutraceutic.key}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                Access 227 scientific studies
                              </a>
                              <PopupList>
                                {nutraceutic.parents.map(parent => {
                                  const selectedParent = Object.values(
                                    suboutcomes,
                                  ).find(
                                    suboutcome => suboutcome.key === parent,
                                  );
                                  return (
                                    <div
                                      key={`popup-${parent}`}
                                      className="list-item"
                                    >
                                      <h4>
                                        <strong>{nutraceutic.title}</strong> for{' '}
                                        {selectedParent?.title}
                                      </h4>
                                      <h5>
                                        These data summarize XX scientific
                                        studies
                                      </h5>
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
                                      {/* <a href="#2">
                                      Read each of the scientific studies
                                    </a> */}
                                    </div>
                                  );
                                })}
                              </PopupList>
                            </PopupContent>
                          </Scrollbar>
                        </Popup>
                        <strong>
                          {nutraceutic.title}
                          <span>{`${nutraceutic.dosage} ${nutraceutic.unit}`}</span>
                        </strong>
                      </div>
                    </div>
                    <FiRefreshCcw
                      className="refresh-icon"
                      size={12}
                      color="#fff"
                      data-tip={`${nutraceutic.title}`}
                      data-for={`sankey-${nutraceutic.key}-refresh`}
                    />
                    <ReactToolTip
                      id={`sankey-${nutraceutic.key}-refresh`}
                      className={`sankey-${nutraceutic.key}-refresh`}
                      place="bottom"
                      type="light"
                      effect="solid"
                      offset={{ top: 10, left: 10 }}
                      html
                      backgroundColor="#fff"
                    />
                    <div className="entry-anchors anchors">
                      <div
                        id={`${nutraceutic.key}`}
                        className="anchors__item"
                      />
                      {nutraceutic.parents.map(parent => {
                        const outcomeIndex = Object.values(outcomes).findIndex(
                          outcome => outcome.suboutcomes.includes(parent),
                        );

                        return (
                          <React.Fragment key={`${nutraceutic.key}-${parent}`}>
                            <div
                              id={`${nutraceutic.key}`}
                              className="anchors__item"
                            />
                            <Xarrow
                              start={`${parent}`}
                              end={`${nutraceutic.key}`}
                              showHead={false}
                              strokeWidth={10}
                              curveness={0.6}
                              startAnchor="right"
                              endAnchor="left"
                              color={
                                (outcomeIndex > -1 &&
                                  fineTune[parent] === 'off') ||
                                !fineTune[parent]
                                  ? 'rgba(0,0,0,0.05)'
                                  : transparentize(
                                      0.8,
                                      Object.values(outcomes)[outcomeIndex]
                                        .color,
                                    )
                              }
                            />
                          </React.Fragment>
                        );
                      })}
                    </div>
                  </Substance>
                );
              })}
          </Substances>

          <ReactToolTip
            id="sankey-tooltip"
            className="sankey-tooltip"
            place="bottom"
            type="light"
            effect="solid"
            html
            backgroundColor="#fff"
          />
        </StepContent>
      )}
    </Container>
  );
};

export default SankeyMobile;
