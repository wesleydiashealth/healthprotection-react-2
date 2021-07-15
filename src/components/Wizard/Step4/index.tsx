import React, { useContext, useCallback } from 'react';
import ReactToolTip from 'react-tooltip';
import { HiQuestionMarkCircle, HiOutlineCheckCircle } from 'react-icons/hi';
import ScrollArea from 'react-scrollbar';
import { CarouselContext } from 'pure-react-carousel';

import { StepContainer } from '../styles';

import Button from '../../Button';

import { useWizard } from '../../../contexts/wizard';

const Step4: React.FC = () => {
  const context = useWizard();
  const { steps, questions } = context;
  const { step4: step, step3: previousStep } = steps;
  const { 7: currentQuestion } = questions;

  const carouselContext = useContext(CarouselContext);

  const wizardSteps = Object.keys(steps).filter(
    item => !item.includes('_'),
  ).length;

  const handleButtonClick = useCallback(
    value => {
      if (value === 'none') {
        context.updateStep('step4', { isCompleted: true, answers: [value] });
        carouselContext.setStoreState({ currentSlide: 4 });

        return;
      }

      const updatedAllergies = Array.isArray(step.answers) ? step.answers : [];

      if (!step?.answers.includes(value)) {
        updatedAllergies.push(value);
      } else {
        updatedAllergies.splice(step.answers.indexOf(value), 1);
      }

      context.updateStep('step4', { answers: updatedAllergies });
    },
    [context, step, carouselContext],
  );

  return (
    <StepContainer
      isCompleted={step?.isCompleted}
      isDisabled={!previousStep.isCompleted}
    >
      {step?.isCompleted && (
        <HiOutlineCheckCircle
          className="completed-icon"
          size={32}
          color="#1BC9BD"
        />
      )}
      <span>Question 4/{wizardSteps}</span>
      <strong>{currentQuestion?.label}</strong>
      <HiQuestionMarkCircle
        className="tooltip-icon"
        size={20}
        color="#7664C8"
        data-tip={`<strong>${currentQuestion?.label}</strong><span>${currentQuestion?.label}</span>`}
        data-for="step_4_tooltip"
      />
      <ReactToolTip
        id="step_4_tooltip"
        className="step-tooltip"
        place="bottom"
        type="light"
        effect="solid"
        offset={{ top: 10, left: 100 }}
        html
        backgroundColor="#fff"
      />
      <ScrollArea className="buttons-list" smoothScrolling horizontal={false}>
        {currentQuestion?.answers &&
          Object.values(currentQuestion.answers).map(answer => (
            <Button
              key={answer.id}
              type="button"
              onClick={() => {
                handleButtonClick(answer.api);
              }}
              isActive={step?.answers.indexOf(answer.api) > -1}
              name="allergies"
              value={step?.answers}
            >
              {answer.label}
            </Button>
          ))}
      </ScrollArea>
      {step?.answers.length > 0 && step.answers.indexOf('none') === -1 && (
        <button
          type="button"
          className="advance-button"
          onClick={() => {
            context.updateStep('step4', {
              isCompleted: true,
              answers: step?.answers,
            });
            carouselContext.setStoreState({ currentSlide: 4 });
          }}
        >
          Next Question
        </button>
      )}
    </StepContainer>
  );
};

export default Step4;
