import React, { useContext, useCallback } from 'react';
import ReactToolTip from 'react-tooltip';
import { HiQuestionMarkCircle, HiOutlineCheckCircle } from 'react-icons/hi';
import ScrollArea from 'react-scrollbar';
import { CarouselContext } from 'pure-react-carousel';

import { useWizard } from 'contexts/wizard';
import { StepContainer } from '../styles';

import Button from '../../Button';
import Input from '../../Input';

const Step3: React.FC = () => {
  const context = useWizard();
  const { steps, questions } = context;
  const { step3: step, step2: previousStep, step2_1: previousSubStep } = steps;
  const currentQuestion = questions.find(question => Number(question.id) === 6);

  const carouselContext = useContext(CarouselContext);

  const wizardSteps = Object.keys(steps).filter(
    item => !item.includes('_'),
  ).length;

  const handleButtonClick = useCallback(
    value => {
      if (value === 'none') {
        context.updateStep('step3', { isCompleted: true, answers: [value] });
        carouselContext.setStoreState({ currentSlide: 3 });

        return;
      }

      const updatedDiets = Array.isArray(step.answers) ? step.answers : [];

      const noneIndex = updatedDiets.indexOf('none');

      if (noneIndex > -1) {
        updatedDiets.splice(noneIndex, 1);
      }

      if (!step?.answers.includes(value)) {
        updatedDiets.push(value);
      } else {
        updatedDiets.splice(step.answers.indexOf(value), 1);
      }

      context.updateStep('step3', { answers: updatedDiets });
    },
    [context, step, carouselContext],
  );

  return currentQuestion?.answers ? (
    <StepContainer
      isCompleted={step?.isCompleted}
      isDisabled={
        (!previousStep.isCompleted && !previousSubStep.isCompleted) ||
        carouselContext.getStoreState().currentSlide !== 2
      }
    >
      {step?.isCompleted && (
        <HiOutlineCheckCircle
          className="completed-icon"
          size={32}
          color="#1BC9BD"
        />
      )}
      <span>Question 3/{wizardSteps}</span>
      <strong>{currentQuestion?.label}</strong>
      <HiQuestionMarkCircle
        className="tooltip-icon"
        size={20}
        color="#7664C8"
        data-tip={`<strong>${currentQuestion?.label}</strong><span>${currentQuestion?.label}</span>`}
        data-for="step_3_tooltip"
      />
      <ReactToolTip
        id="step_3_tooltip"
        className="step-tooltip"
        place="bottom"
        type="light"
        effect="solid"
        offset={{ top: 10, left: 100 }}
        html
        backgroundColor="#fff"
      />
      <ScrollArea className="buttons-list" smoothScrolling horizontal={false}>
        <Input
          type="hidden"
          name={currentQuestion.table}
          value={step?.answers}
        />
        {Object.values(currentQuestion.answers).map(answer => (
          <Button
            key={answer.id}
            type="submit"
            onClick={() => {
              handleButtonClick(answer.api);
            }}
            isActive={step?.answers.indexOf(answer.api) > -1}
            name={`${currentQuestion.table}_selector`}
            value={step?.answers}
          >
            {answer.label}
          </Button>
        ))}
      </ScrollArea>
      {step?.answers.length > 0 && step.answers.indexOf('none') === -1 && (
        <button
          type="submit"
          className="advance-button"
          onClick={() => {
            context.updateStep('step3', {
              isCompleted: true,
              answers: step?.answers,
            });
            carouselContext.setStoreState({ currentSlide: 3 });
          }}
        >
          Next Question
        </button>
      )}
    </StepContainer>
  ) : (
    <></>
  );
};

export default Step3;
