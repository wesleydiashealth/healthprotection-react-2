import React, { useState } from 'react';
import ReactToolTip from 'react-tooltip';
import { HiQuestionMarkCircle } from 'react-icons/hi';

import { StepContainer } from '../styles';
import formSteps from '../../../form.json';

import Button from '../../Button';

const Step1: React.FC = () => {
  const [age, setAge] = useState('');

  const currentStep = formSteps[0];

  return (
    <StepContainer>
      <p>Question 1/{formSteps.length}</p>
      <strong>{currentStep.label}</strong>
      <HiQuestionMarkCircle
        size={20}
        color="#7664C8"
        data-tip={`<strong>${currentStep.title}</strong><span>${currentStep.tooltip}</span>`}
      />
      <ReactToolTip
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
