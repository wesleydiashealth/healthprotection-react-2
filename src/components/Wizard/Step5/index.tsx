import React, { useState, useCallback } from 'react';
import ReactToolTip from 'react-tooltip';
import { HiQuestionMarkCircle, HiOutlineCheckCircle } from 'react-icons/hi';
import { CgChevronRightO } from 'react-icons/cg';
import ScrollArea from 'react-scrollbar';

import { StepContainer } from '../styles';
import formSteps from '../../../form.json';

import Button from '../../Button';

const Step2: React.FC = () => {
  const [hasMedications, setHasMedications] = useState('');
  const [medications, setMedications] = useState<string[]>([]);
  const [stepCompleted, setStepCompleted] = useState<boolean>(false);

  const currentStep = formSteps[4];

  const handleButtonClick = useCallback(
    value => {
      if (value === 'none') {
        setMedications([value]);

        return;
      }

      const noneIndex = medications.indexOf('none');

      if (noneIndex !== -1) {
        medications.splice(noneIndex, 1);
      }

      const existentValue = medications.find(
        medication => medication === value,
      );

      if (!existentValue) {
        setMedications([...medications, value]);
      } else {
        setMedications(medications.filter(medication => medication !== value));
      }
    },
    [medications],
  );

  return (
    <StepContainer
      isCompleted={
        (medications.length > 0 && stepCompleted) || hasMedications === 'no'
      }
    >
      {((medications.length > 0 && stepCompleted) ||
        hasMedications === 'no') && (
        <HiOutlineCheckCircle
          className="completed-icon"
          size={32}
          color="#1BC9BD"
        />
      )}
      <span>
        Question {hasMedications !== 'yes' ? '5' : '5.1'}/{formSteps.length}
      </span>
      <strong>
        {hasMedications !== 'yes'
          ? currentStep.label
          : currentStep.substep?.label}
      </strong>
      <HiQuestionMarkCircle
        className="tooltip-icon"
        size={20}
        color="#7664C8"
        data-tip={`<strong>${currentStep.title}</strong><span>${currentStep.tooltip}</span>`}
        data-for="step_5_tooltip"
      />
      <ReactToolTip
        id="step_5_tooltip"
        className="step-tooltip"
        place="bottom"
        type="light"
        effect="solid"
        offset={{ top: 10, left: 100 }}
        html
        backgroundColor="#fff"
      />
      {hasMedications !== 'yes' &&
        currentStep.options.map(option => (
          <Button
            key={option.value}
            type="button"
            onClick={() => {
              setHasMedications(option.value);
            }}
            isActive={hasMedications === option.value}
            name="has_medications"
            value={hasMedications}
          >
            {option.label}
          </Button>
        ))}
      {hasMedications === 'yes' && (
        <>
          <ScrollArea
            className="buttons-list"
            smoothScrolling
            horizontal={false}
          >
            {currentStep.substep?.options.map(option => (
              <Button
                key={option.value}
                type="button"
                onClick={() => {
                  handleButtonClick(option.value);
                }}
                isActive={medications.indexOf(option.value) > -1}
                name="medications"
                value={medications}
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
        </>
      )}
    </StepContainer>
  );
};

export default Step2;
