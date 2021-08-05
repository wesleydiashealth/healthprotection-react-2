import React, { useCallback, useContext, useState } from 'react';
import ReactToolTip from 'react-tooltip';
import { HiQuestionMarkCircle, HiOutlineCheckCircle } from 'react-icons/hi';
// import ScrollArea from 'react-scrollbar';
import { CarouselContext } from 'pure-react-carousel';
// eslint-disable-next-line import/no-unresolved
// import Chip from '@material-ui/core/chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
// import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import { StepContainer } from '../styles';

import Button from '../../Button';

import { useWizard } from '../../../contexts/wizard';

import medications from '../../../medications.json';

interface MedicationData {
  id: string;
  slug: string;
  title: string;
}

const Step6: React.FC = () => {
  const context = useWizard();
  const { steps, questions } = context;
  const { step6: step, step4: previousStep } = steps;
  const { 13: currentQuestion } = questions || {};

  const subSteps = [steps.step6_1, steps.step6_2, steps.step6_3, steps.step6_4];

  const subStepsCompleted = !!subSteps.filter(subStep => !!subStep.isCompleted)
    .length;

  const [stepNumber, setStepNumber] = useState<string>('6');
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

  return (
    <StepContainer
      isCompleted={step?.isCompleted}
      isDisabled={!previousStep?.isCompleted}
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
      {step?.answers !== 'yes' &&
        currentQuestion?.answers &&
        Object.values(currentQuestion.answers).map(option => (
          <Button
            key={option.api}
            type="button"
            onClick={() => {
              context.updateStep('step6', {
                isCompleted: option.api !== 'yes',
                answers: option.api,
              });
              if (option.api !== 'yes') {
                carouselContext.setStoreState({ currentSlide: 6 });
              } else {
                setStepNumber('6.1');
                setStepTitle('Do you take any prescribed medications?');
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
          <Autocomplete
            multiple
            id="medications_daily"
            options={medications}
            getOptionLabel={option => option.title}
            disabled={step?.isCompleted}
            onChange={(event, newValue) => {
              handleButtonClick(newValue, 'step6_1');
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
          <Autocomplete
            multiple
            id="medications_occasionally"
            options={medications}
            getOptionLabel={option => option.title}
            disabled={step?.isCompleted}
            onChange={(event, newValue) => {
              handleButtonClick(newValue, 'step6_2');
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
        </>
      )}

      {step?.answers === 'yes' && subStepsCompleted && (
        <button
          type="button"
          className="advance-button"
          onClick={() => {
            context.updateStep('step6', {
              isCompleted: true,
              answers: step?.answers,
            });
            carouselContext.setStoreState({ currentSlide: 6 });
          }}
        >
          Next Question
        </button>
      )}
    </StepContainer>
  );
};

export default Step6;
