import React, { useState, useCallback } from 'react';
import ReactToolTip from 'react-tooltip';
import { HiQuestionMarkCircle, HiLockClosed } from 'react-icons/hi';
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
  description: string;
  parents: Array<string>;
}

const Sankey: React.FC = () => {
  const context = useApp();
  const { steps } = context;
  const { step1: previousStep } = steps;

  const { outcomes, suboutcomes } = sankeyData;

  const [fineTune, setFineTune] = useState<FineTune>({});
  const [nutraceutics, setNutraceutics] = useState<Substance[]>([]);

  const handleFineTuneClick = useCallback(
    async (items: Array<Substance>, suboutcome) => {
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
        });

        setNutraceutics(updatedNutraceutics);
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
      }
    },
    [nutraceutics],
  );

  return (
    <Container id="step_2" isActive={previousStep.isCompleted}>
      <div className="step-intro content-wrapper">
        <IoOptionsOutline size={52} />
        <h2>
          Step 2
          {previousStep.isCompleted ? (
            <>
              <HiQuestionMarkCircle
                className="tooltip-icon"
                size={20}
                color="#DB71AF"
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
            </>
          ) : (
            <>
              <HiLockClosed size={20} />
            </>
          )}
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
              return (
                <Outcome
                  key={outcome.key}
                  id={outcome.key}
                  color={outcome.color}
                  suboutcomes={outcome.suboutcomes.length}
                >
                  <div className="exit-anchors anchors">
                    {outcome.suboutcomes.map(suboutcome => (
                      <div
                        key={`${outcome.key}-${suboutcome}`}
                        id={`${outcome.key}-${suboutcome}`}
                        className="anchors__item"
                      />
                    ))}
                  </div>
                  <div className="outcome-wrapper">
                    <span>{outcome.title}</span>
                    <HiQuestionMarkCircle
                      size={20}
                      color="#7664C8"
                      data-tip={`<strong>${outcome.title}</strong><span>${outcome.description}</span>`}
                      data-for="sankey-tooltip"
                    />
                  </div>
                  {outcome.suboutcomes
                    .filter(
                      suboutcome =>
                        !!Object.values(suboutcomes).filter(
                          item => item.key === suboutcome,
                        ).length,
                    )
                    .map(suboutcome => (
                      <Xarrow
                        start={`${outcome.key}-${suboutcome}`}
                        end={`${suboutcome}-${outcome.key}`}
                        showHead={false}
                        strokeWidth={68}
                        curveness={0.6}
                        startAnchor="right"
                        endAnchor="left"
                        color={
                          fineTune[suboutcome] === 'off' ||
                          !fineTune[suboutcome]
                            ? transparentize(0.8, outcome.color)
                            : 'rgba(240, 94, 98, 0.15)'
                        }
                      />
                    ))}
                </Outcome>
              );
            })}
          </Outcomes>

          <SubOutcomes>
            {Object.values(suboutcomes).map(suboutcome => (
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
                id={suboutcome.key}
                className={
                  fineTune[suboutcome.key] === 'off' ||
                  !fineTune[suboutcome.key]
                    ? ''
                    : 'active'
                }
              >
                <div className="entry-anchors anchors">
                  {/* {!!nutraceutics.filter(nutraceutic =>
                    nutraceutic.parents.includes(suboutcome.key),
                  ).length &&
                    nutraceutics
                      .filter(nutraceutic =>
                        nutraceutic.parents.includes(suboutcome.key),
                      )
                      .map((nutraceutic, index) => (
                        <div
                          // eslint-disable-next-line react/no-array-index-key
                          key={`${suboutcome.key}-${index}`}
                          id={`${suboutcome.key}-${index}`}
                          className="anchors__item"
                        />
                      ))} */}

                  {Object.values(outcomes)
                    .filter(outcome =>
                      outcome.suboutcomes.includes(suboutcome.key),
                    )
                    .map(outcome => {
                      return (
                        <div
                          key={`${suboutcome.key}-${outcome.key}`}
                          id={`${suboutcome.key}-${outcome.key}`}
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
                        key={`${suboutcome.key}-${nutraceutic.key}`}
                        id={`${suboutcome.key}-${nutraceutic.key}`}
                        className="anchors__item"
                      />
                    ))}
                </div>
                <div className="content">
                  <span>{suboutcome.title}</span>
                  <HiQuestionMarkCircle
                    size={20}
                    color="#7664C8"
                    data-tip={`<strong>${suboutcome.title}</strong><span>${suboutcome.description}</span>`}
                    data-for="sankey-tooltip"
                  />
                </div>
                <div className="fine-tune">
                  <FineTune
                    isActive={
                      fineTune[suboutcome.key] === 'off' ||
                      !fineTune[suboutcome.key]
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
                        isActive={fineTune[suboutcome.key] === key}
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
            ))}
          </SubOutcomes>

          <Substances
            isActive={
              nutraceutics.filter(nutraceutic => nutraceutic.parents.length)
                .length > 0
            }
          >
            {nutraceutics
              .filter(nutraceutic => nutraceutic.parents.length)
              .map(nutraceutic => (
                <Substance
                  key={nutraceutic.key}
                  id={nutraceutic.key}
                  suboutcomes={nutraceutic.parents.length}
                >
                  <strong>{nutraceutic.title}</strong>
                  <span>{nutraceutic.dosage}</span>
                  <div className="entry-anchors anchors">
                    {nutraceutic.parents.map(parent => {
                      return (
                        <>
                          <div
                            key={`${nutraceutic.key}-${parent}`}
                            id={`${nutraceutic.key}-${parent}`}
                            className="anchors__item"
                          />

                          <Xarrow
                            start={`${parent}-${nutraceutic.key}`}
                            end={`${nutraceutic.key}-${parent}`}
                            showHead={false}
                            strokeWidth={68}
                            curveness={0.6}
                            startAnchor="right"
                            endAnchor="left"
                            color={
                              fineTune[parent] === 'off' || !fineTune[parent]
                                ? 'rgba(0,0,0,0.05)'
                                : 'rgba(240, 94, 98, 0.15)'
                            }
                          />
                        </>
                      );
                    })}
                  </div>
                </Substance>
              ))}
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
