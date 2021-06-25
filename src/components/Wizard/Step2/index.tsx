import React from 'react';
import ReactToolTip from 'react-tooltip';
import { HiQuestionMarkCircle, HiOutlineCheckCircle } from 'react-icons/hi';

import { StepContainer } from '../styles';
import formSteps from '../../../form.json';

import Button from '../../Button';

import { useWizard } from '../../../contexts/wizard';

const Step2: React.FC = () => {
  const currentStep = formSteps[1];

  const context = useWizard();

  const { steps } = context;

  return (
    <StepContainer
      isCompleted={steps.step2?.isCompleted || steps.step2_1?.isCompleted}
      isDisabled={!steps.step1?.isCompleted}
    >
      {(steps.step2?.isCompleted || steps.step2_1?.isCompleted) && (
        <HiOutlineCheckCircle
          className="completed-icon"
          size={32}
          color="#1BC9BD"
        />
      )}
      <span>
        Question {steps.step2?.content !== 'female' ? '2' : '2.1'}/
        {formSteps.length}
      </span>
      <strong>
        {steps.step2?.content !== 'female'
          ? currentStep.label
          : currentStep.substep?.label}
      </strong>
      <HiQuestionMarkCircle
        className="tooltip-icon"
        size={20}
        color="#7664C8"
        data-tip={`<strong>${
          steps.step2?.content !== 'female'
            ? currentStep.title
            : currentStep.substep?.title
        }</strong><span>${
          steps.step2?.content !== 'female'
            ? currentStep.tooltip
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
      {steps.step2?.content !== 'female' &&
        currentStep.options.map(option => (
          <Button
            key={option.value}
            type="button"
            onClick={() => {
              context.updateStep('step2', {
                isCompleted: option.value !== 'female',
                content: option.value,
              });
            }}
            isActive={steps.step2?.content === option.value}
            name="gender"
            value={steps.step2?.content}
          >
            {option.label}
          </Button>
        ))}
      {steps.step2?.content === 'female' &&
        currentStep.substep?.options.map(option => (
          <Button
            key={option.value}
            type="button"
            onClick={() => {
              context.updateStep('step2_1', {
                isCompleted: true,
                content: option.value,
              });
            }}
            isActive={steps.step2_1?.content === option.value}
            name="female_condition"
            value={steps.step2_1?.content}
          >
            {option.label}
          </Button>
        ))}
    </StepContainer>
  );
};

export default Step2;
