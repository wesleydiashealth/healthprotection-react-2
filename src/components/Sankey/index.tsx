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

interface Substance {
  key: string;
  title: string;
  dosage: string;
  description: string;
  parents: Array<string>;
}

const Sankey: React.FC = () => {
  const { outcomes, suboutcomes } = sankeyData;

  const [nutraceutics, setNutraceutics] = useState<Substance[]>([]);

  const handleFineTuneClick = useCallback(
    async (items: Array<Substance>) => {
      if (items.length) {
        const newItems = items.filter(
          (item: Substance) => !nutraceutics.includes(item),
        );

        // const newItems = items.filter(
        //   (item: Substance) => nutraceutics.indexOf(item) !== -1,
        // );

        setNutraceutics([...nutraceutics, ...newItems]);
      } else {
        setNutraceutics(items);
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
              <span>{outcome.title}</span>
              <HiQuestionMarkCircle
                size={20}
                color="#7664C8"
                data-tip={`<strong>${outcome.title}</strong><span>${outcome.description}</span>`}
                data-for="sankey-tooltip"
              />
              {outcome['sub-outcomes'].map(suboutcome => (
                <Xarrow
                  start={outcome.key}
                  end={suboutcome}
                  showHead={false}
                  strokeWidth={40}
                  curveness={0.4}
                  color="rgba(240, 94, 98, 0.07)"
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
                  onClick={() => {
                    handleFineTuneClick([]);
                  }}
                >
                  Off
                </FineTune>
                <FineTune
                  onClick={() => {
                    handleFineTuneClick(suboutcome.substances?.med || []);
                  }}
                >
                  Med
                </FineTune>
                <FineTune
                  onClick={() => {
                    handleFineTuneClick(suboutcome.substances?.max || []);
                  }}
                >
                  Max
                </FineTune>
              </div>
            </div>
          ))}
        </SubOutcomes>

        <Substances>
          {nutraceutics.map(nutraceutic => (
            <div key={nutraceutic.key} id={nutraceutic.key}>
              {nutraceutic.title}
              {nutraceutic.parents.map(parent => {
                return (
                  <Xarrow
                    start={parent}
                    end={nutraceutic.key}
                    showHead={false}
                    strokeWidth={40}
                    curveness={0.4}
                    color="rgba(240, 94, 98, 0.07)"
                  />
                );
              })}
            </div>
          ))}
          {/* {nutraceutics.map(nutraceutic => (
            <div key={nutraceutic} id={nutraceutic}>
              {nutraceutic}
            </div>
          ))} */}
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
