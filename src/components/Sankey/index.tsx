import React from 'react';
import ReactToolTip from 'react-tooltip';
import 'reactjs-popup/dist/index.css';
import { HiQuestionMarkCircle, HiLockClosed } from 'react-icons/hi';
import { IoOptionsOutline } from 'react-icons/io5';

import { useApp } from 'contexts/app';
import { SankeyProvider } from 'contexts/sankey';
import Loading from 'components/Loading';
import Outcomes from './components/Outcomes';
import Suboutcomes from './components/Suboutcomes';
import Nutraceuticals from './components/Nutraceuticals';

import Container, {
  StepIntro,
  StepTitle,
  StepDescription,
  StepContent,
} from './styles';

const Sankey: React.FC = () => {
  const context = useApp();
  const { steps, outcomes } = context;
  const { step1: previousStep } = steps;

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
          <strong>Customize</strong> your desired outcomes
        </StepDescription>
      </StepIntro>
      {previousStep.isCompleted && (
        <SankeyProvider>
          <StepContent>
            {outcomes.length ? (
              <>
                <Outcomes />
                <Suboutcomes />
                <Nutraceuticals />
              </>
            ) : (
              <Loading color="#db71af" />
            )}
          </StepContent>
        </SankeyProvider>
      )}
    </Container>
  );
};

export default Sankey;
