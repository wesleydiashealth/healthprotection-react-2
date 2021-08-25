import React from 'react';
import ReactToolTip from 'react-tooltip';
import 'reactjs-popup/dist/index.css';
import { HiQuestionMarkCircle, HiLockClosed } from 'react-icons/hi';
import { IoOptionsOutline } from 'react-icons/io5';

import Outcome from './components/Outcome';
import Suboutcome from './components/Suboutcome';
import Nutraceuticals from './components/Nutraceuticals';

import Container, {
  StepIntro,
  StepTitle,
  StepDescription,
  StepContent,
  Outcomes,
  SubOutcomes,
} from './styles';

import { useApp } from '../../contexts/app';
import { SankeyProvider } from '../../contexts/sankey';

import sankeyData from '../../sankey-new.json';

const Sankey: React.FC = () => {
  const context = useApp();
  const { steps } = context;
  const { step1: previousStep } = steps;

  previousStep.isCompleted = true;

  const { outcomes, suboutcomes } = sankeyData;

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
        <SankeyProvider>
          <StepContent>
            <Outcomes>
              {Object.values(outcomes).map(outcome => {
                return <Outcome key={outcome.id} {...outcome} />;
              })}
            </Outcomes>
            <SubOutcomes>
              {Object.values(suboutcomes).map(suboutcome => {
                const outcomeColor = Object.values(outcomes).find(outcome =>
                  outcome.suboutcomes.includes(suboutcome.id),
                )?.color;

                return (
                  <Suboutcome
                    key={suboutcome.id}
                    {...suboutcome}
                    color={outcomeColor || '#565656'}
                  />
                );
              })}
            </SubOutcomes>
            <Nutraceuticals />
          </StepContent>
        </SankeyProvider>
      )}
    </Container>
  );
};

export default Sankey;
