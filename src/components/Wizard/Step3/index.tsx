import React, { useCallback, useContext } from 'react';
import ReactToolTip from 'react-tooltip';
import { HiQuestionMarkCircle, HiOutlineCheckCircle } from 'react-icons/hi';
import { CgChevronRightO } from 'react-icons/cg';
import ScrollArea from 'react-scrollbar';
import { CarouselContext } from 'pure-react-carousel';

import { StepContainer } from '../styles';
import formSteps from '../../../form.json';

import Button from '../../Button';

import { useWizard } from '../../../contexts/wizard';

const Step2: React.FC = () => {
  const currentStep = formSteps[2];

  const context = useWizard();

  const { steps } = context;
  const { step3: step } = steps;

  const carouselContext = useContext(CarouselContext);

  const handleButtonClick = useCallback(
    value => {
      if (value === 'none') {
        context.updateStep('step3', { isCompleted: true, content: [value] });
        carouselContext.setStoreState({ currentSlide: 3 });

        return;
      }

      const updatedDiets = Array.isArray(step.content) ? step.content : [];

      if (!step?.content.includes(value)) {
        updatedDiets.push(value);
      } else {
        updatedDiets.splice(step.content.indexOf(value), 1);
      }

      context.updateStep('step3', { content: updatedDiets });
    },
    [context, step, carouselContext],
  );

  return (
    <StepContainer
      isCompleted={steps.step3?.isCompleted}
      isDisabled={!steps.step2.isCompleted && !steps.step2_1.isCompleted}
    >
      {steps.step3?.isCompleted && (
        <HiOutlineCheckCircle
          className="completed-icon"
          size={32}
          color="#1BC9BD"
        />
      )}
      <span>Question 3/{formSteps.length}</span>
      <strong>{currentStep.label}</strong>
      <HiQuestionMarkCircle
        className="tooltip-icon"
        size={20}
        color="#7664C8"
        data-tip={`<strong>${currentStep.title}</strong><span>${currentStep.tooltip}</span>`}
        data-for="step_3_tooltip"
      />
      <ReactToolTip
        id="step_3_tooltip"
        className="step-tooltip"
        place="bottom"
        type="light"
        effect="solid"
        offset={{ top: 10, left: 500 }}
        html
        backgroundColor="#fff"
      />
      <ScrollArea className="buttons-list" smoothScrolling horizontal={false}>
        {currentStep.options.map(option => (
          <Button
            key={option.value}
            type="button"
            onClick={() => {
              handleButtonClick(option.value);
            }}
            isActive={steps.step3?.content.indexOf(option.value) > -1}
            name="diets"
            value={steps.step3?.content}
          >
            {option.label}
          </Button>
        ))}
      </ScrollArea>
      {steps.step3?.content.length > 0 &&
        steps.step3.content.indexOf('none') === -1 && (
          <CgChevronRightO
            className="advance-button"
            size={28}
            color="#7664C8"
            onClick={() => {
              context.updateStep('step3', {
                isCompleted: true,
                content: steps.step3?.content,
              });
              carouselContext.setStoreState({ currentSlide: 3 });
            }}
          />
        )}
    </StepContainer>
  );
};

export default Step2;
