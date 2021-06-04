import React, { useState } from 'react';

import { StepContainer } from '../styles';
import formSteps from '../../../form.json';

import Button from '../../Button';

const Step2: React.FC = () => {
  const [category, setCategory] = useState('');

  const currentStep = formSteps[6];

  return (
    <StepContainer>
      <p>Question 6/{formSteps.length}</p>
      <strong>{currentStep.label}</strong>
      {currentStep.options.map(option => (
        <Button
          key={option.value}
          type="button"
          onClick={() => {
            setCategory(option.value);
          }}
          isActive={category === option.value}
          name="category"
          value={category}
        >
          {option.label}
        </Button>
      ))}
    </StepContainer>
  );
};

export default Step2;
