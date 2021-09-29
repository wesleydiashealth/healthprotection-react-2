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
  const { labels, steps, outcomes } = context;
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
          {labels.step_2_title}
          <HiQuestionMarkCircle
            className="tooltip-icon"
            size={20}
            color={previousStep.isCompleted ? '#DB71AF' : '#565656'}
            data-tip={`<strong>${labels.step_2_title}</strong><span>${labels.step_2_tooltip}</span>`}
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
          <strong>{labels.step_2_description.split(' ')[0]}</strong>{' '}
          {labels.step_2_description.substr(
            labels.step_2_description.indexOf(' ') + 1,
          )}
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
