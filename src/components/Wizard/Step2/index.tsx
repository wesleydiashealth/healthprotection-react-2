import React, { useState } from 'react';
import ReactToolTip from 'react-tooltip';
import { HiQuestionMarkCircle, HiOutlineCheckCircle } from 'react-icons/hi';

import { StepContainer } from '../styles';
import formSteps from '../../../form.json';

import Button from '../../Button';

import { useWizard } from '../../../contexts/wizard';

const Step2: React.FC = () => {
  const [gender, setGender] = useState('');
  const [femaleCondition, setFemaleCondition] = useState('');

  const currentStep = formSteps[1];

  const context = useWizard();

  const { steps } = context;

  return (
    <StepContainer isCompleted={steps.step2}>
      {steps.step2 && (
        <HiOutlineCheckCircle
          className="completed-icon"
          size={32}
          color="#1BC9BD"
        />
      )}
      <span>
        Question {gender !== 'female' ? '2' : '2.1'}/{formSteps.length}
      </span>
      <strong>
        {gender !== 'female' ? currentStep.label : currentStep.substep?.label}
      </strong>
      <HiQuestionMarkCircle
        className="tooltip-icon"
        size={20}
        color="#7664C8"
        data-tip={`<strong>${
          gender !== 'female' ? currentStep.title : currentStep.substep?.title
        }</strong><span>${
          gender !== 'female'
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
      {gender !== 'female' &&
        currentStep.options.map(option => (
          <Button
            key={option.value}
            type="button"
            onClick={() => {
              setGender(option.value);
              context.updateStep('step2', option.value !== 'female');
            }}
            isActive={gender === option.value}
            name="gender"
            value={gender}
          >
            {option.label}
          </Button>
        ))}
      {gender === 'female' &&
        currentStep.substep?.options.map(option => (
          <Button
            key={option.value}
            type="button"
            onClick={() => {
              setFemaleCondition(option.value);
              context.updateStep('step2', true);
            }}
            isActive={femaleCondition === option.value}
            name="female_condition"
            value={femaleCondition}
          >
            {option.label}
          </Button>
        ))}
    </StepContainer>
  );
};

export default Step2;
