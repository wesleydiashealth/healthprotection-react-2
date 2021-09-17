import React, { useCallback, useContext, useState } from 'react';
import ReactToolTip from 'react-tooltip';
import { HiQuestionMarkCircle, HiOutlineCheckCircle } from 'react-icons/hi';
import { FaUndoAlt } from 'react-icons/fa';
import { CarouselContext } from 'pure-react-carousel';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import { useWizard } from 'contexts/wizard';

import drugs from 'drugs.json';

import Button from 'components/Button';
import Input from 'components/Input';
import { StepContainer } from '../styles';

interface MedicationData {
  id: string;
  slug: string;
  title: string;
}

const Step6: React.FC = () => {
  const context = useWizard();
  const { steps, questions } = context;
  const { step6: step, step5: previousStep } = steps;
  const currentQuestion = questions.find(
    question => Number(question.id) === 13,
  );

  const subSteps = [steps.step6_1, steps.step6_2];

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

  return currentQuestion?.answers ? (
    <StepContainer
      isCompleted={step?.isCompleted}
      isDisabled={
        !previousStep?.isCompleted ||
        carouselContext.getStoreState().currentSlide !== 5
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
        {(step.isCompleted || !!step.answers.length) && (
          <FaUndoAlt
            size={16}
            color="#7664c8"
            onClick={() => {
              carouselContext.setStoreState({ currentSlide: 5 });
              setStepNumber('6');
              setStepTitle(currentQuestion?.label);
              context.updateStep('step6', {
                isCompleted: false,
                answers: [],
              });
              context.updateStep('step6_1', {
                isCompleted: false,
                answers: [],
              });
              context.updateStep('step6_2', {
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
        data-for="step_6_drugs_tooltip"
      />
      <ReactToolTip
        id="step_6_drugs_tooltip"
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
              context.updateStep('step6', {
                isCompleted: option.api !== 'yes',
                answers: option.api,
              });
              if (option.api !== 'yes') {
                carouselContext.setStoreState({ currentSlide: 6 });
              } else {
                setStepNumber('6.1');
                setStepTitle('Select below which one you use:');
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
          <Input type="hidden" name="drugs" value={steps?.step6_1.answers} />
          <Input
            type="hidden"
            name="drugsDaily"
            value={steps?.step6_1.answers}
          />
          <Autocomplete
            multiple
            id="drugs_daily"
            options={drugs}
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
          <Input
            type="hidden"
            name="drugsOccasionally"
            value={steps?.step6_2.answers}
          />
          <Autocomplete
            multiple
            id="drugs_occasionally"
            options={drugs}
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
          {subStepsCompleted && (
            <button
              type="submit"
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
        </>
      )}
    </StepContainer>
  ) : (
    <></>
  );
};

export default Step6;
