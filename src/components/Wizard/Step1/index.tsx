import React, { useState } from 'react';
import ReactToolTip from 'react-tooltip';
import { HiQuestionMarkCircle, HiOutlineCheckCircle } from 'react-icons/hi';

import { StepContainer } from '../styles';
import formSteps from '../../../form.json';

import Button from '../../Button';

import { useWizard } from '../../../contexts/wizard';

const Step1: React.FC = () => {
  const [age, setAge] = useState('');

  const currentStep = formSteps[0];

  const context = useWizard();

  const { steps } = context;

  return (
    <StepContainer isCompleted={steps.step1}>
      {steps.step1 && (
        <HiOutlineCheckCircle
          className="completed-icon"
          size={32}
          color="#1BC9BD"
        />
      )}
      <span>Question 1/{formSteps.length}</span>
      <strong>{currentStep.label}</strong>
      <HiQuestionMarkCircle
        className="tooltip-icon"
        size={20}
        color="#7664C8"
        data-tip={`<strong>${currentStep.title}</strong><span>${currentStep.tooltip}</span>`}
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
      {currentStep.options.map(option => (
        <Button
          key={option.value}
          type="button"
          onClick={() => {
            setAge(option.value);
            context.updateStep('step1', true);
          }}
          isActive={age === option.value}
          name="age"
          value={age}
        >
          {option.label}
        </Button>
      ))}
    </StepContainer>
  );
};

export default Step1;
