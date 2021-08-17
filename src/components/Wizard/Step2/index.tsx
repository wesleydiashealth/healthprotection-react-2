import React, { useContext } from 'react';
import ReactToolTip from 'react-tooltip';
import { HiQuestionMarkCircle, HiOutlineCheckCircle } from 'react-icons/hi';
import { CarouselContext } from 'pure-react-carousel';

import { StepContainer } from '../styles';
import formSteps from '../../../form.json';

import Button from '../../Button';

import { useWizard } from '../../../contexts/wizard';

const Step2: React.FC = () => {
  const currentStep = formSteps[1];

  const context = useWizard();
  const { steps, questions } = context;
  const { step2: step, step2_1: subStep, step1: previousStep } = steps;
  const { 2: currentQuestion } = questions || {};

  const carouselContext = useContext(CarouselContext);

  const wizardSteps = Object.keys(steps).filter(
    item => !item.includes('_'),
  ).length;

  return (
    <StepContainer
      isCompleted={step?.isCompleted || subStep?.isCompleted}
      isDisabled={!previousStep?.isCompleted}
    >
      {(step?.isCompleted || subStep?.isCompleted) && (
        <HiOutlineCheckCircle
          className="completed-icon"
          size={32}
          color="#1BC9BD"
        />
      )}
      <span>
        Question {step?.answers !== 'female' ? '2' : '2.1'}/{wizardSteps}
      </span>
      <strong>
        {step?.answers !== 'female'
          ? currentQuestion?.label
          : currentStep.substep?.label}
      </strong>
      <HiQuestionMarkCircle
        className="tooltip-icon"
        size={20}
        color="#7664C8"
        data-tip={`<strong>${
          step?.answers !== 'female'
            ? currentQuestion?.label
            : currentStep.substep?.title
        }</strong><span>${
          step?.answers !== 'female'
            ? currentQuestion?.label
            : currentStep.substep?.tooltip
        }</span>`}
        data-for="step_2_tooltip"
      />
      <ReactToolTip
        id="step_2_tooltip"
        className="step-tooltip"
        place="bottom"
        type="light"
        effect="solid"
        offset={{ top: 10, left: 100 }}
        html
        backgroundColor="#fff"
      />
      {step?.answers !== 'female' &&
        currentQuestion?.answers &&
        Object.values(currentQuestion?.answers).map(answer => (
          <Button
            key={answer.id}
            type="button"
            onClick={() => {
              context.updateStep('step2', {
                isCompleted: answer.api !== 'female',
                answers: answer.api,
              });
              if (answer.api !== 'female')
                carouselContext.setStoreState({ currentSlide: 2 });
            }}
            isActive={step?.answers === answer.api}
            name="gender"
            value={step?.answers}
          >
            {answer.label}
          </Button>
        ))}
      {step?.answers === 'female' &&
        currentQuestion?.answers &&
        Object.values(currentQuestion.answers)
          .filter(answer => !!answer.has_child)
          .map(option => {
            return (
              <Button
                key={option.api}
                type="button"
                onClick={() => {
                  context.updateStep('step2_1', {
                    isCompleted: true,
                    answers: option.api,
                  });
                  carouselContext.setStoreState({ currentSlide: 2 });
                }}
                isActive={subStep?.answers === option.api}
                name="female_condition"
                value={subStep?.answers}
              >
                {option.label}
              </Button>
            );
          })}
    </StepContainer>
  );
};

export default Step2;
