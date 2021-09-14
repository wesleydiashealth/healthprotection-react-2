import React, { useState, useContext } from 'react';
import ReactToolTip from 'react-tooltip';
import { HiQuestionMarkCircle, HiOutlineCheckCircle } from 'react-icons/hi';
import { FaUndoAlt } from 'react-icons/fa';
import { CarouselContext } from 'pure-react-carousel';

import { useWizard } from 'contexts/wizard';
import Button from 'components/Button';
import Input from 'components/Input';
import { StepContainer } from '../styles';

const Step2: React.FC = () => {
  const context = useWizard();
  const { steps, questions } = context;
  const { step2: step, step2_1: subStep, step1: previousStep } = steps;
  const currentQuestion = questions.find(question => Number(question.id) === 2);

  const [stepNumber, setStepNumber] = useState<string>('2');
  const [stepTitle, setStepTitle] = useState<string>(
    currentQuestion?.label || '',
  );

  const carouselContext = useContext(CarouselContext);

  const wizardSteps = Object.keys(steps).filter(
    item => !item.includes('_'),
  ).length;

  return currentQuestion?.answers ? (
    <StepContainer
      isCompleted={step?.isCompleted || subStep?.isCompleted}
      isDisabled={
        !previousStep?.isCompleted ||
        carouselContext.getStoreState().currentSlide !== 1
      }
    >
      {(step?.isCompleted || subStep?.isCompleted) && (
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
              carouselContext.setStoreState({ currentSlide: 1 });
              setStepNumber('2');
              setStepTitle(currentQuestion?.label);
              context.updateStep('step2', {
                isCompleted: false,
                answers: [],
              });
              context.updateStep('step2_1', {
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
          step?.answers !== 'female' ? currentQuestion?.label : stepTitle
        }</strong><span>${currentQuestion?.label}</span>`}
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
      {!step.subAnswers ? (
        Object.values(currentQuestion?.answers).map(answer => (
          <Button
            key={answer.id}
            type="submit"
            onClick={() => {
              context.updateStep('step2', {
                isCompleted: answer.api !== 'female',
                answers: answer.api,
                subAnswers: answer?.answers,
              });
              if (answer.api !== 'female') {
                carouselContext.setStoreState({ currentSlide: 2 });
              } else {
                setStepNumber('2.1');
                setStepTitle('Are you:');
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
            name={currentQuestion.table}
            value={step?.answers}
          />
          {step.subAnswers.map(subAnswer => (
            <Button
              key={subAnswer.slug}
              type="submit"
              onClick={() => {
                context.updateStep('step2_1', {
                  isCompleted: true,
                  answers: subAnswer.slug || '',
                });
                carouselContext.setStoreState({ currentSlide: 2 });
              }}
              isActive={subStep?.answers === subAnswer.slug}
              name="female_condition"
              value={subAnswer.api}
            >
              {subAnswer.label}
            </Button>
          ))}
        </>
      )}
    </StepContainer>
  ) : (
    <></>
  );
};

export default Step2;
