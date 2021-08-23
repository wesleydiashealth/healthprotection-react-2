import React, { useState, useCallback } from 'react';
import ReactToolTip from 'react-tooltip';
import { Scrollbar } from 'react-scrollbars-custom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { HiQuestionMarkCircle, HiLockClosed } from 'react-icons/hi';
import { FiRefreshCcw } from 'react-icons/fi';
import { FaInfoCircle } from 'react-icons/fa';
import Xarrow from 'react-xarrows';
import { IoOptionsOutline } from 'react-icons/io5';
import { transparentize } from 'polished';

// import Outcome2 from './components/Outcome';

import Container, {
  StepIntro,
  StepTitle,
  StepDescription,
  // StepSubDescription,
  StepContent,
  Outcomes,
  Outcome,
  OutcomeContent,
  OutcomeName,
  SubOutcomes,
  SubOutcome,
  SubOutcomeContent,
  SubOutcomeContentName,
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
import sankeyDataNew from '../../sankey-new.json';

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
  const {
    outcomes: outcomes2,
    suboutcomes: suboutcomes2,
    nutraceuticals: nutraceuticals2,
  } = sankeyDataNew;

  const [fineTune, setFineTune] = useState<FineTune>({});
  const [nutraceutics, setNutraceutics] = useState<Substance[]>([]);

  const [connections, setConnections] = useState<Connections>(() => {
    const items = {};

    Object.values(outcomes2).forEach(outcome => {
      const subItems = {};

      outcome.suboutcomes.forEach(suboutcome => {
        Object.assign(subItems, { [suboutcome]: [] });
      });

      Object.assign(items, { [outcome.id]: subItems });
    });

    return items;
  });

  const handleFineTuneClick = useCallback(
    async (items: Array<Substance>, suboutcome) => {
      const suboutcomeParents = Object.values(outcomes2).filter(outcome =>
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
            const connectionItems = connections[parent.id][suboutcome];

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
          const connectionItems = connections[parent.id][suboutcome];

          connectionItems.splice(0, connectionItems.length);

          setConnections(connections);
        });

        context.updateStep('step2', { isCompleted: false });
      }
    },
    [nutraceutics, connections, outcomes2, context],
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
      </StepIntro>
      {previousStep.isCompleted && (
        <StepContent>
          <Outcomes>
            {/* {Object.values(outcomes).map(outcome => {
              return <Outcome2 id={outcome.key} {...outcome} />;
            })} */}

            {Object.values(outcomes2).map(outcome => {
              const connectionIndex = Object.keys(connections).findIndex(
                connection => connection === outcome.id,
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
                  key={outcome.id}
                  id={outcome.id}
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
                                  <React.Fragment
                                    key={`${outcome.id}-${child[0]}-${nutraceutic}`}
                                  >
                                    <div
                                      id={`${outcome.id}-${child[0]}-${nutraceutic}`}
                                      className="anchors__item"
                                    />
                                    <Xarrow
                                      start={`${outcome.id}-${child[0]}-${nutraceutic}`}
                                      end={`${nutraceutic}-${child[0]}-${outcome.id}`}
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
                                  </React.Fragment>
                                );
                              })
                          ) : (
                            <>
                              <div
                                key={`${outcome.id}-${child[0]}`}
                                id={`${outcome.id}-${child[0]}`}
                                className="anchors__item"
                              />
                              <Xarrow
                                key={`arrow-${outcome.id}-${child[0]}`}
                                start={`${outcome.id}-${child[0]}`}
                                end={`${child[0]}-${outcome.id}`}
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
                          <React.Fragment key={`${outcome.id}-${suboutcome}`}>
                            <div
                              id={`${outcome.id}-${suboutcome}`}
                              className="anchors__item"
                            />
                            <Xarrow
                              start={`${outcome.id}-${suboutcome}`}
                              end={`${suboutcome}-${outcome.id}`}
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
                          </React.Fragment>
                        ))}
                  </div>
                  <OutcomeContent className="outcome-wrapper">
                    <img
                      src={`${process.env.PUBLIC_URL}/icons/outcomes/${outcome.id}.svg`}
                      alt={outcome.title}
                      width={48}
                    />
                    <OutcomeName>
                      {outcome.title}
                      <HiQuestionMarkCircle
                        size={20}
                        color="rgba(0,0,0,0.7)"
                        data-tip={`<strong>${outcome.title}</strong><span>${outcome.description}</span>`}
                        data-for="sankey-tooltip"
                        className="tooltip-icon"
                      />
                    </OutcomeName>
                  </OutcomeContent>
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
                  <SubOutcomeContent>
                    <HiQuestionMarkCircle
                      size={20}
                      color="rgba(0,0,0,0.7)"
                      data-tip={`<strong>${suboutcome.title}</strong><span>${suboutcome.description}</span>`}
                      data-for="sankey-tooltip"
                      className="tooltip-icon"
                    />
                    <SubOutcomeContentName>
                      {suboutcome.title}
                    </SubOutcomeContentName>
                  </SubOutcomeContent>
                  <FineTuneGroup>
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
                  </FineTuneGroup>
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
                          <FaInfoCircle
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
                                  <div
                                    key={`popup-${parent}`}
                                    className="list-item"
                                  >
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
                          <React.Fragment key={`${nutraceutic.key}-${parent}`}>
                            <div
                              id={`${nutraceutic.key}-${parent}`}
                              className="anchors__item"
                            />
                            <Xarrow
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
            offset={{ top: 10, left: 100 }}
            html
            backgroundColor="#fff"
          />
        </StepContent>
      )}
    </Container>
  );
};

export default Sankey;
