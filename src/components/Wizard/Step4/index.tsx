import React, { useState, useCallback } from 'react';
import ReactToolTip from 'react-tooltip';
import { HiQuestionMarkCircle, HiOutlineCheckCircle } from 'react-icons/hi';
import { CgChevronRightO } from 'react-icons/cg';
import ScrollArea from 'react-scrollbar';

import { StepContainer } from '../styles';
import formSteps from '../../../form.json';

import Button from '../../Button';

const Step2: React.FC = () => {
  const [allergies, setAllergies] = useState<string[]>([]);
  const [stepCompleted, setStepCompleted] = useState<boolean>(false);

  const currentStep = formSteps[3];

  const handleButtonClick = useCallback(
    value => {
      if (value === 'none') {
        setAllergies([value]);

        return;
      }

      const noneIndex = allergies.indexOf('none');

      if (noneIndex !== -1) {
        allergies.splice(noneIndex, 1);
      }

      const existentValue = allergies.find(allergy => allergy === value);

      if (!existentValue) {
        setAllergies([...allergies, value]);
      } else {
        setAllergies(allergies.filter(allergy => allergy !== value));
      }
    },
    [allergies],
  );

  return (
    <StepContainer isCompleted={allergies.length > 0 && stepCompleted}>
      {allergies.length > 0 && stepCompleted && (
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
            isActive={allergies.indexOf(option.value) > -1}
            name="allergies"
            value={allergies}
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
          setStepCompleted(true);
        }}
      />
    </StepContainer>
  );
};

export default Step2;
