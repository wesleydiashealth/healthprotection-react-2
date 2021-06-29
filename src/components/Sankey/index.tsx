import React, { useState, useCallback } from 'react';
import ReactToolTip from 'react-tooltip';
import { HiQuestionMarkCircle } from 'react-icons/hi';
import Xarrow from 'react-xarrows';
import { IoOptionsOutline } from 'react-icons/io5';

import Container, {
  Outcomes,
  SubOutcomes,
  Substances,
  FineTune,
} from './styles';

import sankeyData from '../../sankey.json';

interface FineTune {
  [key: string]: 'off' | 'med' | 'max';
}

interface Substance {
  key: string;
  title: string;
  dosage: string;
  description: string;
  parents: Array<string>;
}

const Sankey: React.FC = () => {
  const { outcomes, suboutcomes } = sankeyData;

  const [fineTune, setFineTune] = useState<FineTune>({});
  const [nutraceutics, setNutraceutics] = useState<Substance[]>([]);

  const handleFineTuneClick = useCallback(
    async (items: Array<Substance>, suboutcome) => {
      if (items.length) {
        const updatedNutraceutics = [...nutraceutics];

        Object.values(items).forEach(item => {
          const itemIndex = nutraceutics.findIndex(
            nutraceutic => nutraceutic.key === item.key,
          );

          if (itemIndex > -1) {
            setNutraceutics(
              nutraceutics
                .filter(substance => substance.key === item.key)
                .map(substance => {
                  const suboutcomeIndex = substance.parents.indexOf(suboutcome);

                  if (suboutcomeIndex > -1) {
                    substance.parents.splice(suboutcomeIndex, 1, suboutcome);
                  } else {
                    substance.parents.push(suboutcome);
                  }

                  return substance;
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
    <Container id="step_2">
      <div className="step-intro content-wrapper">
        <IoOptionsOutline size={52} color="#DB71AF" />
        <h2>Step 2</h2>
        <h3>
          <strong>Fine-tune</strong> your desired outcomes
        </h3>
        <span>
          Click on the selected substances to explore scientific information
        </span>
      </div>
      <div className="step-content content-wrapper">
        <Outcomes>
          {outcomes.map(outcome => (
            <div key={outcome.key} id={outcome.key}>
              <div className="outcome-wrapper">
                <span>{outcome.title}</span>
                <HiQuestionMarkCircle
                  size={20}
                  color="#7664C8"
                  data-tip={`<strong>${outcome.title}</strong><span>${outcome.description}</span>`}
                  data-for="sankey-tooltip"
                />
              </div>
              {outcome['sub-outcomes'].map(suboutcome => (
                <Xarrow
                  start={outcome.key}
                  end={suboutcome}
                  showHead={false}
                  strokeWidth={90}
                  curveness={0.6}
                  color="rgba(0,0,0,0.05)"
                />
              ))}
            </div>
          ))}
        </Outcomes>

        <SubOutcomes>
          {suboutcomes.map(suboutcome => (
            <div key={suboutcome.key} id={suboutcome.key}>
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
                <FineTune
                  isActive={fineTune[suboutcome.key] === 'med'}
                  onClick={() => {
                    handleFineTuneClick(
                      suboutcome.substances?.med || [],
                      suboutcome.key,
                    );
                    setFineTune({
                      ...fineTune,
                      [suboutcome.key]: 'med',
                    });
                  }}
                >
                  Med
                </FineTune>
                <FineTune
                  isActive={fineTune[suboutcome.key] === 'max'}
                  onClick={() => {
                    handleFineTuneClick(
                      suboutcome.substances?.max || [],
                      suboutcome.key,
                    );
                    setFineTune({
                      ...fineTune,
                      [suboutcome.key]: 'max',
                    });
                  }}
                >
                  Max
                </FineTune>
              </div>
            </div>
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
              <div key={nutraceutic.key} id={nutraceutic.key}>
                <strong>{nutraceutic.title}</strong>
                <span>{nutraceutic.dosage}</span>
                {nutraceutic.parents.map(parent => {
                  return (
                    <Xarrow
                      start={parent}
                      end={nutraceutic.key}
                      showHead={false}
                      strokeWidth={90}
                      curveness={0.6}
                      color="rgba(0,0,0,0.05)"
                    />
                  );
                })}
              </div>
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
    </Container>
  );
};

export default Sankey;
