import React, { useState } from 'react';

import { StepContainer } from '../styles';
import formSteps from '../../../form.json';

import Button from '../../Button';

const Step2: React.FC = () => {
  const [gender, setGender] = useState('');

  const currentStep = formSteps[1];

  return (
    <StepContainer>
      <p>Question 2/{formSteps.length}</p>
      <strong>{currentStep.label}</strong>
      {currentStep.options.map(option => (
        <Button
          key={option.value}
          type="button"
          onClick={() => {
            setGender(option.value);
          }}
          isActive={gender === option.value}
          name="gender"
          value={gender}
        >
          {option.label}
        </Button>
      ))}
    </StepContainer>
  );
};

export default Step2;
