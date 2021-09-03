import React, { useContext } from 'react';
import ReactToolTip from 'react-tooltip';
import { HiQuestionMarkCircle } from 'react-icons/hi';
import { IoOptionsOutline } from 'react-icons/io5';
import { CarouselContext } from 'pure-react-carousel';

import { useApp } from 'contexts/app';
import { useWizard } from 'contexts/wizard';
import StepContainer from './styles';

const Step10: React.FC = () => {
  const appContext = useApp();

  const context = useWizard();
  const carouselContext = useContext(CarouselContext);

  return (
    <StepContainer>
      <HiQuestionMarkCircle
        className="tooltip-icon"
        size={20}
        color="#db71af"
        data-tip="<strong>Titulo</strong><span>Texto</span>"
        data-for="step_8_tooltip"
      />
      <ReactToolTip
        id="step_8_tooltip"
        className="step-tooltip"
        place="bottom"
        type="light"
        effect="solid"
        offset={{ top: 10, left: 100 }}
        html
        backgroundColor="#fff"
      />
      <IoOptionsOutline size={52} color="#DB71AF" />
      <h3>Well done, now it&apos;s time to fine-tune your goals</h3>

      <p>
        Based on your answers we&apos;ve filtered{' '}
        <strong>more than 1,000 nutraceuticals to just 11</strong>
      </p>

      <p>
        <strong>
          Go safely to the Step 2 100% risks free based on your answers.
        </strong>
      </p>
      <div className="buttons">
        <button
          type="button"
          name="reset"
          onClick={() => {
            context.resetSteps();
            carouselContext.setStoreState({ currentSlide: 0 });
          }}
        >
          Reset
        </button>
        <a
          href="#step_2"
          onClick={() => {
            appContext.updateStep('step1', { isCompleted: true });
          }}
        >
          Go to Step 2
        </a>
      </div>
    </StepContainer>
  );
};

export default Step10;
