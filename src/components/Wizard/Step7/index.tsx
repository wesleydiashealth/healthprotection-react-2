import React, { useState, useContext, useCallback } from 'react';
import ReactToolTip from 'react-tooltip';
import { HiQuestionMarkCircle, HiOutlineCheckCircle } from 'react-icons/hi';
import { FaUndoAlt } from 'react-icons/fa';
import { CarouselContext } from 'pure-react-carousel';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import { useApp } from 'contexts/app';
import { useWizard } from 'contexts/wizard';

import Button from 'components/Button';
import Input from 'components/Input';
import { StepContainer } from '../styles';

interface NutraceuticalData {
  slug: string;
  title: string;
}

const Step7: React.FC = () => {
  const appContext = useApp();
  const { nutraceuticals } = appContext;

  const context = useWizard();
  const { steps, questions } = context;
  const { step7: step, step6: previousStep } = steps;
  const currentQuestion = questions.find(
    question => Number(question.id) === 17,
  );

  const subSteps = [steps.step7_1, steps.step7_2];

  const subStepsCompleted = !!subSteps.filter(subStep => !!subStep.isCompleted)
    .length;

  const [stepNumber, setStepNumber] = useState<string>('7');
  const [stepTitle, setStepTitle] = useState<string>(
    currentQuestion?.label || '',
  );

  const carouselContext = useContext(CarouselContext);

  const wizardSteps = Object.keys(steps).filter(
    item => !item.includes('_'),
  ).length;

  const handleButtonClick = useCallback(
    (medicationObject: NutraceuticalData[], updatedStep: string) => {
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
      isCompleted={step?.isCompleted || subStepsCompleted}
      isDisabled={
        !previousStep?.isCompleted ||
        carouselContext.getStoreState().currentSlide !== 6
      }
    >
      {(step?.isCompleted || subStepsCompleted) && (
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
              carouselContext.setStoreState({ currentSlide: 6 });
              setStepNumber('7');
              setStepTitle(currentQuestion?.label);
              context.updateStep('step7', {
                isCompleted: false,
                answers: [],
              });
              context.updateStep('step7_1', {
                isCompleted: false,
                answers: [],
              });
              context.updateStep('step7_2', {
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
        data-tip={`<strong>${
          step?.answers !== 'yes' ? currentQuestion?.label : stepTitle
        }</strong><span>${currentQuestion?.label}</span>`}
        data-for="step_7_tooltip"
      />
      <ReactToolTip
        id="step_7_tooltip"
        className="step-tooltip"
        place="bottom"
        type="light"
        effect="solid"
        offset={{ top: 10, left: 100 }}
        html
        backgroundColor="#fff"
      />
      {step?.answers !== 'yes' ? (
        Object.values(currentQuestion?.answers).map(answer => (
          <Button
            key={answer.id}
            type="submit"
            onClick={() => {
              context.updateStep('step7', {
                isCompleted: answer.api !== 'yes',
                answers: answer.api,
              });
              if (answer.api !== 'yes') {
                carouselContext.setStoreState({ currentSlide: 7 });
              } else {
                setStepNumber('7.1');
                setStepTitle('Select below which one you use:');
              }
            }}
            isActive={step?.answers === answer.api}
            name={currentQuestion.table}
            value={step?.answers}
          >
            {answer.label}
          </Button>
        ))
      ) : (
        <>
          <Input
            type="hidden"
            name="nutraceuticalsDaily"
            value={steps?.step7_1.answers}
          />
          <Autocomplete
            multiple
            id="nutraceuticals_daily"
            options={nutraceuticals}
            getOptionLabel={option => option.title}
            disabled={step?.isCompleted}
            onChange={(event, newValue) => {
              handleButtonClick(newValue, 'step7_1');
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
            name="nutraceuticalsOccasionally"
            value={steps?.step7_2.answers}
          />
          <Autocomplete
            multiple
            id="nutraceuticals_occasionally"
            options={nutraceuticals}
            getOptionLabel={option => option.title}
            disabled={step?.isCompleted}
            onChange={(event, newValue) => {
              handleButtonClick(newValue, 'step7_2');
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
                context.updateStep('step7', {
                  isCompleted: true,
                  answers: step?.answers,
                });
                carouselContext.setStoreState({ currentSlide: 7 });
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

export default Step7;
