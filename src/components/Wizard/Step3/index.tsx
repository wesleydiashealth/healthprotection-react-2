import React, { useState, useCallback } from 'react';
import ReactToolTip from 'react-tooltip';
import { HiQuestionMarkCircle, HiOutlineCheckCircle } from 'react-icons/hi';
import { CgChevronRightO } from 'react-icons/cg';
import ScrollArea from 'react-scrollbar';

import { StepContainer } from '../styles';
import formSteps from '../../../form.json';

import Button from '../../Button';

const Step2: React.FC = () => {
  const [diets, setDiets] = useState<string[]>([]);
  const [stepCompleted, setStepCompleted] = useState<boolean>(false);

  const currentStep = formSteps[2];

  const handleButtonClick = useCallback(
    value => {
      if (value === 'none') {
        setDiets([value]);

        return;
      }

      const noneIndex = diets.indexOf('none');

      if (noneIndex !== -1) {
        diets.splice(noneIndex, 1);
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
    <StepContainer isCompleted={diets.length > 0 && stepCompleted}>
      {diets.length > 0 && stepCompleted && (
        <HiOutlineCheckCircle
          className="completed-icon"
          size={32}
          color="#1BC9BD"
        />
      )}
      <span>Question 3/{formSteps.length}</span>
      <strong>{currentStep.label}</strong>
      <HiQuestionMarkCircle
        className="tooltip-icon"
        size={20}
        color="#7664C8"
        data-tip={`<strong>${currentStep.title}</strong><span>${currentStep.tooltip}</span>`}
        data-for="step_3_tooltip"
      />
      <ReactToolTip
        id="step_3_tooltip"
        className="step-tooltip"
        place="bottom"
        type="light"
        effect="solid"
        offset={{ top: 10, left: 500 }}
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
            isActive={diets.indexOf(option.value) > -1}
            name="diets"
            value={diets}
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
