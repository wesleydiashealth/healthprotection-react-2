import React, { useCallback, useContext, useState } from 'react';
import ReactToolTip from 'react-tooltip';
import { HiQuestionMarkCircle, HiOutlineCheckCircle } from 'react-icons/hi';
import ScrollArea from 'react-scrollbar';
import { CarouselContext } from 'pure-react-carousel';

import { StepContainer } from '../styles';
import formSteps from '../../../form.json';

import Button from '../../Button';

import { useWizard } from '../../../contexts/wizard';

interface MedicationData {
  medication: string;
  frequency: string;
}

const Step2: React.FC = () => {
  const currentStep = formSteps[4];

  const context = useWizard();
  const { steps, questions } = context;
  const { step5: step, step5_1: subStep, step4: previousStep } = steps;
  const { 8: currentQuestion } = questions;

  const [stepNumber, setStepNumber] = useState<string>('5');
  const [stepTitle, setStepTitle] = useState<string>(currentQuestion.label);
  const [selectedMedication, setSelectedMedication] = useState<string>('');

  const carouselContext = useContext(CarouselContext);

  const handleButtonClick = useCallback(
    (medicationObject: MedicationData) => {
      const value = Object.values(medicationObject).join('_');

      const updatedMedications = Array.isArray(subStep.answers)
        ? subStep.answers
        : [];

      if (
        Array.isArray(subStep.answers) &&
        !subStep?.answers.find((medication: string) =>
          medication.includes(medicationObject.medication),
        )
      ) {
        updatedMedications.push(value);
      } else {
        updatedMedications.splice(subStep.answers.indexOf(value), 1);
      }

      context.updateStep('step5_1', { answers: updatedMedications });
      setSelectedMedication('');
      setStepTitle(currentQuestion.label);
    },
    [context, subStep, currentQuestion.label],
  );

  return (
    <StepContainer
      isCompleted={step?.isCompleted || subStep?.isCompleted}
      isDisabled={!previousStep?.isCompleted}
    >
      {((step?.answers.length > 0 &&
        (step?.isCompleted || subStep?.isCompleted)) ||
        step?.answers === 'no') && (
        <HiOutlineCheckCircle
          className="completed-icon"
          size={32}
          color="#1BC9BD"
        />
      )}
      <span>
        Question {stepNumber}/{formSteps.length}
      </span>
      <strong>{stepTitle}</strong>
      <HiQuestionMarkCircle
        className="tooltip-icon"
        size={20}
        color="#7664C8"
        data-tip={`<strong>${stepTitle}</strong><span>${stepTitle}</span>`}
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
      {step?.answers !== 'yes' &&
        currentQuestion?.answers &&
        Object.values(currentQuestion.answers).map(option => (
          <Button
            key={option.api}
            type="button"
            onClick={() => {
              context.updateStep('step5', {
                isCompleted: option.api !== 'yes',
                answers: option.api,
              });
              if (option.api !== 'yes') {
                carouselContext.setStoreState({ currentSlide: 5 });
              } else {
                setStepNumber('5.1');
                setStepTitle(currentStep.substep?.label || '');
              }
            }}
            isActive={step?.answers === option.api}
            name="has_medications"
            value={step?.answers}
          >
            {option.label}
          </Button>
        ))}
      {step?.answers === 'yes' && currentQuestion?.answers && (
        <>
          {!selectedMedication.length && (
            <ScrollArea
              className="buttons-list"
              smoothScrolling
              horizontal={false}
            >
              {Object.values(currentQuestion.answers)
                .filter(answer => !!answer.has_child)
                .map(option => (
                  <Button
                    key={option.api}
                    type="button"
                    onClick={() => {
                      setSelectedMedication(option.api);
                      setStepNumber('5.2');
                      setStepTitle('How often?');
                    }}
                    isActive={
                      Array.isArray(subStep.answers) &&
                      !!subStep.answers.find((medication: string) =>
                        medication.includes(option.api),
                      )
                    }
                    name="medications"
                    value={step?.answers}
                  >
                    {option.label}{' '}
                    <span>
                      {Array.isArray(subStep.answers) &&
                        !!subStep.answers.find((medication: string) =>
                          medication.includes(option.api),
                        ) &&
                        `(${
                          subStep?.answers
                            .find((medication: string) =>
                              medication.includes(option.api),
                            )
                            ?.split('_')[1] || ''
                        })`}
                    </span>
                  </Button>
                ))}
            </ScrollArea>
          )}
          {selectedMedication && (
            <>
              <Button
                type="button"
                onClick={() => {
                  handleButtonClick({
                    medication: selectedMedication,
                    frequency: 'continuosly',
                  });
                }}
                name="medications_frequency"
                value="continuosly"
              >
                Continuosly (daily, weekly, monthly)
              </Button>
              <Button
                type="button"
                onClick={() => {
                  handleButtonClick({
                    medication: selectedMedication,
                    frequency: 'occasionally',
                  });
                }}
                name="medications_frequency"
                value="occasionally"
              >
                Occasionally
              </Button>
            </>
          )}
          {!selectedMedication && !!subStep?.answers.length && (
            <button
              type="button"
              className="advance-button"
              onClick={() => {
                context.updateStep('step5_1', {
                  isCompleted: true,
                  answers: step?.answers,
                });
                carouselContext.setStoreState({ currentSlide: 5 });
              }}
            >
              Next Question
            </button>
          )}
        </>
      )}
    </StepContainer>
  );
};

export default Step2;
