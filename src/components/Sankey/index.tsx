import React, { useState } from 'react';
import ReactToolTip from 'react-tooltip';
import { HiQuestionMarkCircle } from 'react-icons/hi';
import Xarrow from 'react-xarrows';

import Container, {
  Outcomes,
  SubOutcomes,
  Substances,
  FineTune,
} from './styles';

import sankeyData from '../../sankey.json';

const Sankey: React.FC = () => {
  const { outcomes, suboutcomes, substances } = sankeyData;

  const [fineTune, setFineTune] = useState({});

  return (
    <Container>
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
                  setFineTune({
                    ...fineTune,
                    abc: 'off',
                  });
                }}
              >
                Off
              </FineTune>
              <FineTune>Med</FineTune>
              <FineTune>Max</FineTune>
            </div>
          </div>
        ))}
      </SubOutcomes>

      <Substances>
        {substances.map(substance => (
          <div key={substance.key} id={substance.key}>
            {substance.title}
          </div>
        ))}
      </Substances>

      <Xarrow
        start="cardiovascular-health"
        end="cholesterol-and-triglycedires"
        showHead={false}
        strokeWidth={40}
        curveness={0.4}
        color="rgba(240, 94, 98, 0.07)"
      />
      <Xarrow
        start="cardiovascular-health"
        end="blood-pressure"
        showHead={false}
        strokeWidth={40}
        curveness={0.4}
        color="rgba(240, 94, 98, 0.07)"
      />
      <Xarrow
        start="immunity"
        end="immune-response"
        showHead={false}
        strokeWidth={40}
        curveness={0.4}
        color="rgba(240, 94, 98, 0.07)"
      />
      <Xarrow
        start="immunity"
        end="nutrient-supplementation"
        showHead={false}
        strokeWidth={40}
        curveness={0.4}
        color="rgba(240, 94, 98, 0.07)"
      />

      <Xarrow
        start="cholesterol-and-triglycedires"
        end="omega-3"
        showHead={false}
        strokeWidth={40}
        curveness={0.4}
        color="rgba(240, 94, 98, 0.07)"
      />
      <Xarrow
        start="cholesterol-and-triglycedires"
        end="black-garlic"
        showHead={false}
        strokeWidth={40}
        curveness={0.4}
        color="rgba(240, 94, 98, 0.07)"
      />
      <Xarrow
        start="immune-response"
        end="black-garlic"
        showHead={false}
        strokeWidth={40}
        curveness={0.4}
        color="rgba(240, 94, 98, 0.07)"
      />
      <Xarrow
        start="immune-response"
        end="vitamin-c"
        showHead={false}
        strokeWidth={40}
        curveness={0.4}
        color="rgba(240, 94, 98, 0.07)"
      />

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
    </Container>
  );
};

export default Sankey;
