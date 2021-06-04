import React, { useState, useCallback } from 'react';
import ScrollArea from 'react-scrollbar';

import { StepContainer } from '../styles';
import formSteps from '../../../form.json';

import Button from '../../Button';

const Step2: React.FC = () => {
  const [diets, setDiets] = useState<string[]>([]);

  const currentStep = formSteps[3];

  const handleButtonClick = useCallback(
    value => {
      if (value === 'none') {
        setDiets([]);

        return;
      }

      const existentValue = diets.find(diet => diet === value);

      if (!existentValue) {
        setDiets([...diets, value]);
      } else {
        setDiets(diets.filter(diet => diet !== value));
      }
    },
    [diets],
  );

  return (
    <StepContainer>
      <p>Question 3/{formSteps.length}</p>
      <strong>{currentStep.label}</strong>
      <ScrollArea className="buttons-list" smoothScrolling horizontal={false}>
        {currentStep.options.map(option => (
          <Button
            key={option.value}
            type="button"
            onClick={() => {
              handleButtonClick(option.value);
            }}
            isActive={diets.indexOf(option.value) > -1}
            name="diets"
            value={diets}
          >
            {option.label}
          </Button>
        ))}
      </ScrollArea>
    </StepContainer>
  );
};

export default Step2;
