import React, { useState, useCallback } from 'react';
import ReactToolTip from 'react-tooltip';
import { Scrollbar } from 'react-scrollbars-custom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { HiQuestionMarkCircle, HiLockClosed } from 'react-icons/hi';
import { FiRefreshCcw } from 'react-icons/fi';
import Xarrow from 'react-xarrows';
import { IoOptionsOutline } from 'react-icons/io5';
import { transparentize } from 'polished';

import Container, {
  Outcome,
  Outcomes,
  SubOutcomes,
  SubOutcome,
  Substances,
  Substance,
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

const Sankey: React.FC = () => {
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
      <div className="step-intro content-wrapper">
        <IoOptionsOutline
          size={52}
          color={previousStep.isCompleted ? '#DB71AF' : '#565656'}
        />
        <h2>
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
        </h2>

        {!previousStep.isCompleted && (
          <div className="step-disabled">
            <strong>Step Blocked.</strong>{' '}
            <span>Finish Step 1 to proceed.</span>
          </div>
        )}

        <h3>
          <strong>Fine-tune</strong> your desired outcomes
        </h3>
        <span>
          Click on the selected substances to explore scientific information.
        </span>
      </div>
      {previousStep.isCompleted && (
        <div className="step-content content-wrapper">
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
                  <div className="exit-anchors anchors">
                    {Object.values(outcomeConnections).filter(
                      connection => !!connection.length,
                    ).length
                      ? Object.entries(outcomeConnections).map(child => {
                          return child[1].filter(
                            connection => !!connection.length,
                          ).length ? (
                            child[1]
                              .filter(nutraceutic => !!nutraceutic.length)
                              .map(nutraceutic => {
                                return (
                                  <>
                                    <div
                                      key={`${outcome.key}-${child[0]}-${nutraceutic}`}
                                      id={`${outcome.key}-${child[0]}-${nutraceutic}`}
                                      className="anchors__item"
                                    />
                                    <Xarrow
                                      key={`arrow-${outcome.key}-${child[0]}-${nutraceutic}`}
                                      start={`${outcome.key}-${child[0]}-${nutraceutic}`}
                                      end={`${nutraceutic}-${child[0]}-${outcome.key}`}
                                      showHead={false}
                                      strokeWidth={58}
                                      curveness={0.6}
                                      startAnchor="right"
                                      endAnchor="left"
                                      color={
                                        fineTune[child[0]] === 'off' ||
                                        !fineTune[child[0]]
                                          ? 'rgba(0,0,0,0.05)'
                                          : transparentize(0.8, outcome.color)
                                      }
                                    />
                                  </>
                                );
                              })
                          ) : (
                            <>
                              <div
                                key={`${outcome.key}-${child[0]}`}
                                id={`${outcome.key}-${child[0]}`}
                                className="anchors__item"
                              />
                              <Xarrow
                                key={`arrow-${outcome.key}-${child[0]}`}
                                start={`${outcome.key}-${child[0]}`}
                                end={`${child[0]}-${outcome.key}`}
                                showHead={false}
                                strokeWidth={58}
                                curveness={0.6}
                                startAnchor="right"
                                endAnchor="left"
                                color={
                                  fineTune[child[0]] === 'off' ||
                                  !fineTune[child[0]]
                                    ? 'rgba(0,0,0,0.05)'
                                    : transparentize(0.8, outcome.color)
                                }
                              />
                            </>
                          );
                        })
                      : outcome.suboutcomes.map(suboutcome => (
                          <>
                            <div
                              key={`${outcome.key}-${suboutcome}`}
                              id={`${outcome.key}-${suboutcome}`}
                              className="anchors__item"
                            />
                            <Xarrow
                              key={`arrow-${outcome.key}-${suboutcome}`}
                              start={`${outcome.key}-${suboutcome}`}
                              end={`${suboutcome}-${outcome.key}`}
                              showHead={false}
                              strokeWidth={58}
                              curveness={0.6}
                              startAnchor="right"
                              endAnchor="left"
                              color={
                                fineTune[suboutcome] === 'off' ||
                                !fineTune[suboutcome]
                                  ? 'rgba(0,0,0,0.05)'
                                  : transparentize(0.8, outcome.color)
                              }
                            />
                          </>
                        ))}
                  </div>
                  <div className="outcome-wrapper">
                    <HiQuestionMarkCircle
                      size={20}
                      color="rgba(0,0,0,0.7)"
                      data-tip={`<strong>${outcome.title}</strong><span>${outcome.description}</span>`}
                      data-for="sankey-tooltip"
                      className="tooltip-icon"
                    />
                    <span>{outcome.title}</span>
                  </div>
                </Outcome>
              );
            })}
          </Outcomes>

          <SubOutcomes>
            {Object.values(suboutcomes).map(suboutcome => {
              const outcomeIndex = Object.values(outcomes).findIndex(outcome =>
                outcome.suboutcomes.includes(suboutcome.key),
              );

              const suboutcomeOutcomes = Object.entries(connections).filter(
                connection => !!connection[1][suboutcome.key],
              );

              return (
                <SubOutcome
                  key={suboutcome.key}
                  nutraceutics={
                    nutraceutics.filter(nutraceutic =>
                      nutraceutic.parents.includes(suboutcome.key),
                    ).length ||
                    Object.values(outcomes).filter(outcome =>
                      outcome.suboutcomes.includes(suboutcome.key),
                    ).length
                  }
                  color={
                    outcomeIndex > -1
                      ? Object.values(outcomes)[outcomeIndex].color
                      : '#f2f2f2'
                  }
                  isActive={
                    fineTune[suboutcome.key] !== undefined &&
                    fineTune[suboutcome.key] !== 'off'
                  }
                  id={suboutcome.key}
                >
                  <div className="entry-anchors anchors">
                    {suboutcomeOutcomes.map(suboutcomeOutcome => {
                      return Object.entries(suboutcomeOutcome[1]).filter(
                        connection =>
                          connection[0] === suboutcome.key &&
                          !!connection[1].length,
                      ).length ? (
                        Object.entries(suboutcomeOutcome[1])
                          .filter(
                            nutraceutic =>
                              nutraceutic[0] === suboutcome.key &&
                              !!nutraceutic[1].length,
                          )
                          .map(nutraceutic => {
                            return nutraceutic[1].map(item => (
                              <div
                                key={`${item}-${nutraceutic[0]}-${suboutcomeOutcome[0]}`}
                                id={`${item}-${nutraceutic[0]}-${suboutcomeOutcome[0]}`}
                                className="anchors__item"
                              />
                            ));
                          })
                      ) : (
                        <div
                          key={`${suboutcome.key}-${suboutcomeOutcome[0]}`}
                          id={`${suboutcome.key}-${suboutcomeOutcome[0]}`}
                          className="anchors__item"
                        />
                      );
                    })}
                  </div>
                  <div className="exit-anchors anchors">
                    {nutraceutics
                      .filter(nutraceutic =>
                        nutraceutic.parents.includes(suboutcome.key),
                      )
                      .map(nutraceutic => (
                        <div
                          key={`anchor-${suboutcome.key}-${nutraceutic.key}`}
                          id={`${suboutcome.key}-${nutraceutic.key}`}
                          className="anchors__item"
                        />
                      ))}
                  </div>
                  <div className="content">
                    <HiQuestionMarkCircle
                      size={20}
                      color="rgba(0,0,0,0.7)"
                      data-tip={`<strong>${suboutcome.title}</strong><span>${suboutcome.description}</span>`}
                      data-for="sankey-tooltip"
                      className="tooltip-icon"
                    />
                    <span>{suboutcome.title}</span>
                  </div>
                  <div className="fine-tune">
                    <FineTune
                      isActive={
                        fineTune[suboutcome.key] === 'off' ||
                        !fineTune[suboutcome.key]
                      }
                      color={
                        outcomeIndex > -1
                          ? Object.values(outcomes)[outcomeIndex].color
                          : '#565656'
                      }
                      onClick={() => {
                        handleFineTuneClick([], suboutcome.key);
                        setFineTune({
                          ...fineTune,
                          [suboutcome.key]: 'off',
                        });
                      }}
                    >
                      Off
                    </FineTune>
                    {Object.keys(suboutcome.sustances).map((key, index) => {
                      return (
                        <FineTune
                          key={key}
                          isActive={fineTune[suboutcome.key] === key}
                          color={
                            outcomeIndex > -1
                              ? Object.values(outcomes)[outcomeIndex].color
                              : '#565656'
                          }
                          onClick={() => {
                            handleFineTuneClick(
                              Object.values(suboutcome.sustances)[index] || [],
                              suboutcome.key,
                            );

                            setFineTune({
                              ...fineTune,
                              [suboutcome.key]: key,
                            });
                          }}
                        >
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </FineTune>
                      );
                    })}
                  </div>
                </SubOutcome>
              );
            })}
          </SubOutcomes>

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
                      <Popup
                        trigger={
                          <HiQuestionMarkCircle
                            className="tooltip-icon"
                            size={20}
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
                                ).find(suboutcome => suboutcome.key === parent);
                                return (
                                  <div className="list-item">
                                    <h4>
                                      <strong>{nutraceutic.title}</strong> for{' '}
                                      {selectedParent?.title}
                                    </h4>
                                    <h5>
                                      These data summarize XX scientific studies
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
                      <strong>{nutraceutic.title}</strong>
                      <span>{`${nutraceutic.dosage} ${nutraceutic.unit}`}</span>
                    </div>
                    <FiRefreshCcw
                      className="refresh-icon"
                      size={20}
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
                      {nutraceutic.parents.map(parent => {
                        const outcomeIndex = Object.values(outcomes).findIndex(
                          outcome => outcome.suboutcomes.includes(parent),
                        );

                        return (
                          <>
                            <div
                              key={`${nutraceutic.key}-${parent}`}
                              id={`${nutraceutic.key}-${parent}`}
                              className="anchors__item"
                            />
                            <Xarrow
                              key={`anchor-${nutraceutic.key}-${parent}`}
                              start={`${parent}-${nutraceutic.key}`}
                              end={`${nutraceutic.key}-${parent}`}
                              showHead={false}
                              strokeWidth={58}
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
                          </>
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
            offset={{ top: 10, left: 100 }}
            html
            backgroundColor="#fff"
          />
        </div>
      )}
    </Container>
  );
};

export default Sankey;
