import React, { useState } from 'react';

import { StepContainer } from '../styles';
import formSteps from '../../../form.json';

import Button from '../../Button';

const Step2: React.FC = () => {
  const [medications, setMedications] = useState('');

  const currentStep = formSteps[5];

  return (
    <StepContainer>
      <p>Question 5/{formSteps.length}</p>
      <strong>{currentStep.label}</strong>
      {currentStep.options.map(option => (
        <Button
          key={option.value}
          type="button"
          onClick={() => {
            setMedications(option.value);
          }}
          isActive={medications === option.value}
          name="medications"
          value={medications}
        >
          {option.label}
        </Button>
      ))}
    </StepContainer>
  );
};

export default Step2;
