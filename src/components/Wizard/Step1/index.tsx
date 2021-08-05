import React, { useContext } from 'react';
import ReactToolTip from 'react-tooltip';
import { HiQuestionMarkCircle, HiOutlineCheckCircle } from 'react-icons/hi';
import { CarouselContext } from 'pure-react-carousel';

import { StepContainer } from '../styles';

import Button from '../../Button';

import { useWizard } from '../../../contexts/wizard';

const Step1: React.FC = () => {
  const context = useWizard();
  const { steps, questions } = context;
  const { step1: step } = steps;
  const { 1: currentQuestion } = questions || {};

  const previousStep = { isCompleted: true };

  const carouselContext = useContext(CarouselContext);

  const wizardSteps = Object.keys(steps).filter(
    item => !item.includes('_'),
  ).length;

  return (
    <StepContainer
      isCompleted={step.isCompleted}
      isDisabled={!previousStep?.isCompleted}
    >
      {step.isCompleted && (
        <HiOutlineCheckCircle
          className="completed-icon"
          size={32}
          color="#1BC9BD"
        />
      )}
      <span>Question 1/{wizardSteps}</span>
      <strong>{currentQuestion?.label}</strong>
      <HiQuestionMarkCircle
        className="tooltip-icon"
        size={20}
        color="#7664C8"
        data-tip={`<strong>${currentQuestion?.label}</strong><span>${currentQuestion?.label}</span>`}
        data-for="step_1_tooltip"
      />
      <ReactToolTip
        id="step_1_tooltip"
        className="step-tooltip"
        place="bottom"
        type="light"
        effect="solid"
        offset={{ top: 10, left: 100 }}
        html
        backgroundColor="#fff"
      />
      {currentQuestion?.answers &&
        Object.values(currentQuestion.answers).map(answer => (
          <Button
            key={answer.id}
            type="button"
            onClick={() => {
              context.updateStep('step1', {
                isCompleted: true,
                answers: answer.api,
              });
              carouselContext.setStoreState({ currentSlide: 1 });
            }}
            isActive={step.answers === answer.api}
            name="age"
            value={step.answers}
          >
            {answer.label}
          </Button>
        ))}
    </StepContainer>
  );
};

export default Step1;
