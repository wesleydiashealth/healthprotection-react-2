import React, { useContext } from 'react';
import ReactToolTip from 'react-tooltip';
import { HiQuestionMarkCircle, HiOutlineCheckCircle } from 'react-icons/hi';
import { CgChevronRightO } from 'react-icons/cg';
import ScrollArea from 'react-scrollbar';
import { CarouselContext } from 'pure-react-carousel';

import { StepContainer } from '../styles';
import formSteps from '../../../form.json';

import Button from '../../Button';

import { useWizard } from '../../../contexts/wizard';

const Step6: React.FC = () => {
  const currentStep = formSteps[5];

  const context = useWizard();

  const { steps } = context;

  const carouselContext = useContext(CarouselContext);

  return (
    <StepContainer
      isCompleted={steps.step6?.isCompleted}
      isDisabled={!steps.step5.isCompleted && !steps.step5_1.isCompleted}
    >
      {steps.step6?.content.length > 0 && (
        <HiOutlineCheckCircle
          className="completed-icon"
          size={32}
          color="#1BC9BD"
        />
      )}
      <span>Question 6/{formSteps.length}</span>
      <strong>{currentStep.label}</strong>
      <HiQuestionMarkCircle
        className="tooltip-icon"
        size={20}
        color="#7664C8"
        data-tip={`<strong>${currentStep.title}</strong><span>${currentStep.tooltip}</span>`}
        data-for="step_6_tooltip"
      />
      <ReactToolTip
        id="step_6_tooltip"
        className="step-tooltip"
        place="bottom"
        type="light"
        effect="solid"
        offset={{ top: 10, left: 100 }}
        html
        backgroundColor="#fff"
      />
      <ScrollArea className="buttons-list" smoothScrolling horizontal={false}>
        {currentStep.options.map(option => (
          <Button
            key={option.value}
            type="button"
            onClick={() => {
              context.updateStep('step6', {
                isCompleted: true,
                content: option.value,
              });
              carouselContext.setStoreState({ currentSlide: 6 });
            }}
            isActive={steps.step6?.content === option.value}
            name="category"
            value={steps.step6?.content}
          >
            {option.label}
          </Button>
        ))}
      </ScrollArea>
      <CgChevronRightO className="advance-button" size={28} color="#7664C8" />
    </StepContainer>
  );
};

export default Step6;
