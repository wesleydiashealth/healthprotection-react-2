import React, { useContext } from 'react';
import { IoOptionsOutline } from 'react-icons/io5';
import { BsChevronCompactRight } from 'react-icons/bs';
import { CarouselContext } from 'pure-react-carousel';

import StepContainer from './styles';

import { useApp } from '../../../contexts/app';
import { useWizard } from '../../../contexts/wizard';

const Step7: React.FC = () => {
  const appContext = useApp();

  const context = useWizard();
  const carouselContext = useContext(CarouselContext);

  return (
    <StepContainer>
      <IoOptionsOutline size={52} color="#DB71AF" />
      <strong>Well done, now it&apos;s time to fine-tune your goals</strong>
      <p>
        All our products are sold without prescriptions, but we care about their
        efficiency and of course, your safety.
      </p>
      <p>Based on your answers we&apos;ve filtered</p>
      <div className="results">
        <ul>
          <li>17 outcomes</li>
          <li>43 sub-outcomes</li>
          <li>500+ products</li>
        </ul>
        <BsChevronCompactRight size={72} color="#C6C6C6" />
        <ul>
          <li>2 outcomes</li>
          <li>4 sub-outcomes</li>
          <li>11 products</li>
        </ul>
      </div>
      <p>for you to safely fine-tune your priorities.</p>
      <div className="buttons">
        <button
          type="button"
          name="reset"
          onClick={() => {
            context.resetSteps();
            carouselContext.setStoreState({ currentSlide: -1 });
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

export default Step7;
