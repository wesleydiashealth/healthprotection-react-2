import React, { useCallback } from 'react';
import ReactToolTip from 'react-tooltip';
import { HiQuestionMarkCircle, HiOutlineCheckCircle } from 'react-icons/hi';
import { CgChevronRightO } from 'react-icons/cg';
import ScrollArea from 'react-scrollbar';

import { StepContainer } from '../styles';
import formSteps from '../../../form.json';

import Button from '../../Button';

import { useWizard } from '../../../contexts/wizard';

const Step2: React.FC = () => {
  const currentStep = formSteps[3];

  const context = useWizard();

  const { steps } = context;
  const { step4: step } = steps;

  const handleButtonClick = useCallback(
    value => {
      if (value === 'none') {
        context.updateStep('step4', { isCompleted: true, content: [value] });

        return;
      }

      const updatedAllergies = Array.isArray(step.content) ? step.content : [];

      if (!step?.content.includes(value)) {
        updatedAllergies.push(value);
      } else {
        updatedAllergies.splice(step.content.indexOf(value), 1);
      }

      context.updateStep('step4', { content: updatedAllergies });
    },
    [context, step],
  );

  return (
    <StepContainer
      isCompleted={steps.step4?.isCompleted}
      isDisabled={!steps.step3.isCompleted}
    >
      {steps.step4?.isCompleted && (
        <HiOutlineCheckCircle
          className="completed-icon"
          size={32}
          color="#1BC9BD"
        />
      )}
      <span>Question 4/{formSteps.length}</span>
      <strong>{currentStep.label}</strong>
      <HiQuestionMarkCircle
        className="tooltip-icon"
        size={20}
        color="#7664C8"
        data-tip={`<strong>${currentStep.title}</strong><span>${currentStep.tooltip}</span>`}
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
        {currentStep.options.map(option => (
          <Button
            key={option.value}
            type="button"
            onClick={() => {
              handleButtonClick(option.value);
            }}
            isActive={steps.step4?.content.indexOf(option.value) > -1}
            name="allergies"
            value={steps.step4?.content}
          >
            {option.label}
          </Button>
        ))}
      </ScrollArea>
      <CgChevronRightO
        className="advance-button"
        size={28}
        color="#7664C8"
        onClick={() => {
          context.updateStep('step4', {
            isCompleted: true,
            content: steps.step4?.content,
          });
        }}
      />
    </StepContainer>
  );
};

export default Step2;
