import React, { useCallback, useContext, useState } from 'react';
import ReactToolTip from 'react-tooltip';
import { HiQuestionMarkCircle, HiOutlineCheckCircle } from 'react-icons/hi';
import { FaUndoAlt } from 'react-icons/fa';
import { CarouselContext } from 'pure-react-carousel';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import { useWizard } from 'contexts/wizard';
import medications from 'medications.json';

import Button from 'components/Button';
import Input from 'components/Input';
import { StepContainer } from '../styles';

interface MedicationData {
  id: string;
  slug: string;
  title: string;
}

const Step5: React.FC = () => {
  const context = useWizard();
  const { steps, questions } = context;
  const { step5: step, step4: previousStep } = steps;
  const currentQuestion = questions.find(question => Number(question.id) === 8);

  const subSteps = [steps.step5_1, steps.step5_2];

  const subStepsCompleted = !!subSteps.filter(subStep => !!subStep.isCompleted)
    .length;

  const [stepNumber, setStepNumber] = useState<string>('5');
  const [stepTitle, setStepTitle] = useState<string>(
    currentQuestion?.label || '',
  );

  const carouselContext = useContext(CarouselContext);

  const wizardSteps = Object.keys(steps).filter(
    item => !item.includes('_'),
  ).length;

  const handleButtonClick = useCallback(
    (medicationObject: MedicationData[], updatedStep: string) => {
      const medicationsList: string[] = [];

      if (medicationObject.length) {
        medicationObject.forEach(medication => {
          medicationsList.push(medication.slug);
        });

        context.updateStep(updatedStep, {
          isCompleted: true,
          answers: medicationsList,
        });
      } else {
        context.updateStep(updatedStep, {
          isCompleted: false,
          answers: [],
        });
      }
    },
    [context],
  );

  return currentQuestion?.answers ? (
    <StepContainer
      isCompleted={step?.isCompleted}
      isDisabled={
        !previousStep?.isCompleted ||
        carouselContext.getStoreState().currentSlide !== 4
      }
    >
      {((step?.answers.length > 0 && step?.isCompleted) ||
        step?.answers === 'no') && (
        <HiOutlineCheckCircle
          className="completed-icon"
          size={32}
          color="#1BC9BD"
        />
      )}
      <span>
        Question {stepNumber}/{wizardSteps}
        {(step.isCompleted || subStepsCompleted) && (
          <FaUndoAlt
            size={16}
            color="#7664c8"
            onClick={() => {
              carouselContext.setStoreState({ currentSlide: 4 });
              context.updateStep('step5', {
                isCompleted: false,
                answers: [],
              });
              context.updateStep('step5_1', {
                isCompleted: false,
                answers: [],
              });
              context.updateStep('step5_2', {
                isCompleted: false,
                answers: [],
              });
            }}
          />
        )}
      </span>
      <strong>{stepTitle}</strong>
      <HiQuestionMarkCircle
        className="tooltip-icon"
        size={20}
        color="#7664C8"
        data-tip={`<strong>${stepTitle}</strong><span>${stepTitle}</span>`}
        data-for="step_5_medications_tooltip"
      />
      <ReactToolTip
        id="step_5_medications_tooltip"
        className="step-tooltip"
        place="bottom"
        type="light"
        effect="solid"
        offset={{ top: 10, left: 100 }}
        html
        backgroundColor="#fff"
      />
      {step?.answers !== 'yes' ? (
        Object.values(currentQuestion.answers).map(option => (
          <Button
            key={option.api}
            type="submit"
            onClick={() => {
              context.updateStep('step5', {
                isCompleted: option.api !== 'yes',
                answers: option.api,
              });
              if (option.api !== 'yes') {
                carouselContext.setStoreState({ currentSlide: 5 });
              } else {
                setStepNumber('5.1');
                setStepTitle('Select below which medications you use:');
              }
            }}
            isActive={step?.answers === option.api}
            name={currentQuestion.table}
            value={step?.answers}
          >
            {option.label}
          </Button>
        ))
      ) : (
        <>
          <Input
            type="hidden"
            name="med_daily"
            value={steps?.step5_1.answers}
          />
          <Autocomplete
            multiple
            id="medications_daily"
            options={medications}
            getOptionLabel={option => option.title}
            disabled={step?.isCompleted}
            onChange={(event, newValue) => {
              handleButtonClick(newValue, 'step5_1');
            }}
            renderInput={params => (
              <TextField
                {...params}
                variant="standard"
                label="Daily Use"
                placeholder="Type your medications"
              />
            )}
          />
          <Input
            type="hidden"
            name="med_occasionally"
            value={steps?.step5_2.answers}
          />
          <Autocomplete
            multiple
            id="medications_occasionally"
            options={medications}
            getOptionLabel={option => option.title}
            disabled={step?.isCompleted}
            onChange={(event, newValue) => {
              handleButtonClick(newValue, 'step5_2');
            }}
            renderInput={params => (
              <TextField
                {...params}
                variant="standard"
                label="Occasionally Use"
                placeholder="Type your medications"
              />
            )}
          />
          {subStepsCompleted && (
            <button
              type="submit"
              className="advance-button"
              onClick={() => {
                context.updateStep('step5', {
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
  ) : (
    <></>
  );
};

export default Step5;
