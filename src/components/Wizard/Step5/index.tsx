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
  const currentStep = formSteps[4];

  const context = useWizard();

  const { steps } = context;
  const { step5_1: step } = steps;

  const handleButtonClick = useCallback(
    value => {
      if (value === 'none') {
        context.updateStep('step5_1', { isCompleted: true, content: [value] });

        return;
      }

      const updatedMedications = Array.isArray(step.content)
        ? step.content
        : [];

      if (!step?.content.includes(value)) {
        updatedMedications.push(value);
      } else {
        updatedMedications.splice(step.content.indexOf(value), 1);
      }

      context.updateStep('step5_1', { content: updatedMedications });
    },
    [context, step],
  );

  return (
    <StepContainer
      isCompleted={steps.step5?.isCompleted}
      isDisabled={!steps.step4?.isCompleted}
    >
      {((steps.step5?.content.length > 0 && steps.step5?.isCompleted) ||
        steps.step5?.content === 'no') && (
        <HiOutlineCheckCircle
          className="completed-icon"
          size={32}
          color="#1BC9BD"
        />
      )}
      <span>
        Question {steps.step5?.content !== 'yes' ? '5' : '5.1'}/
        {formSteps.length}
      </span>
      <strong>
        {steps.step5?.content !== 'yes'
          ? currentStep.label
          : currentStep.substep?.label}
      </strong>
      <HiQuestionMarkCircle
        className="tooltip-icon"
        size={20}
        color="#7664C8"
        data-tip={`<strong>${currentStep.title}</strong><span>${currentStep.tooltip}</span>`}
        data-for="step_5_tooltip"
      />
      <ReactToolTip
        id="step_5_tooltip"
        className="step-tooltip"
        place="bottom"
        type="light"
        effect="solid"
        offset={{ top: 10, left: 100 }}
        html
        backgroundColor="#fff"
      />
      {steps.step5?.content !== 'yes' &&
        currentStep.options.map(option => (
          <Button
            key={option.value}
            type="button"
            onClick={() => {
              context.updateStep('step5', {
                isCompleted: option.value !== 'yes',
                content: option.value,
              });
            }}
            isActive={steps.step5?.content === option.value}
            name="has_medications"
            value={steps.step5?.content}
          >
            {option.label}
          </Button>
        ))}
      {steps.step5?.content === 'yes' && (
        <>
          <ScrollArea
            className="buttons-list"
            smoothScrolling
            horizontal={false}
          >
            {currentStep.substep?.options.map(option => (
              <Button
                key={option.value}
                type="button"
                onClick={() => {
                  handleButtonClick(option.value);
                }}
                isActive={steps.step5_1?.content.indexOf(option.value) > -1}
                name="medications"
                value={steps.step5_1?.content}
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
              context.updateStep('step5', {
                isCompleted: true,
                content: steps.step5_1?.content,
              });
            }}
          />
        </>
      )}
    </StepContainer>
  );
};

export default Step2;
