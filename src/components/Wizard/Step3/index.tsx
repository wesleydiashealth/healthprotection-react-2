import React, { useState, useCallback } from 'react';
import ReactToolTip from 'react-tooltip';
import { HiQuestionMarkCircle, HiOutlineCheckCircle } from 'react-icons/hi';
import { CgChevronRightO } from 'react-icons/cg';
import ScrollArea from 'react-scrollbar';

import { StepContainer } from '../styles';
import formSteps from '../../../form.json';

import Button from '../../Button';

import { useWizard } from '../../../contexts/wizard';

const Step2: React.FC = () => {
  const [diets, setDiets] = useState<string[]>([]);

  const currentStep = formSteps[2];

  const context = useWizard();

  const { steps } = context;

  const handleButtonClick = useCallback(
    value => {
      if (value === 'none') {
        setDiets([value]);
        context.updateStep('step3', true);

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
    [diets, context],
  );

  return (
    <StepContainer isCompleted={steps.step3}>
      {steps.step3 && (
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
      {diets.length > 0 && diets.indexOf('none') === -1 && (
        <CgChevronRightO
          className="advance-button"
          size={28}
          color="#7664C8"
          onClick={() => {
            context.updateStep('step3', true);
          }}
        />
      )}
    </StepContainer>
  );
};

export default Step2;
