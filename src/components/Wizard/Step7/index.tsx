import React, { useState, useContext } from 'react';
import ReactToolTip from 'react-tooltip';
import { HiQuestionMarkCircle, HiOutlineCheckCircle } from 'react-icons/hi';
import ScrollArea from 'react-scrollbar';
import { CarouselContext } from 'pure-react-carousel';

import bloodTestJson from 'blood-test.json';
import { useWizard } from 'contexts/wizard';
import { StepContainer } from '../styles';

import Button from '../../Button';

interface BloodTestData {
  [key: string]: string;
}

const Step7: React.FC = () => {
  const context = useWizard();
  const { steps, questions } = context;
  const { step7: step, step7_1: subStep, step6: previousStep } = steps;
  const currentQuestion = questions.find(
    question => Number(question.id) === 14,
  );

  const [bloodTestData, setBloodTestData] = useState<BloodTestData>({});

  const [stepNumber, setStepNumber] = useState<string>('7');
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
      isDisabled={!previousStep?.isCompleted}
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
            type="button"
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
          <ScrollArea
            className="inputs-list"
            smoothScrolling
            horizontal={false}
          >
            {
              // Object.values(currentQuestion.answers)
              Object.values(bloodTestJson).map(option => (
                <label key={option.api} htmlFor={`bloodtest-${option.api}`}>
                  {option.label}
                  <input
                    type="text"
                    name={`bloodtest-${option.api}`}
                    id={`bloodtest-${option.api}`}
                    className="input-text"
                    value={bloodTestData[option.api] || ''}
                    maxLength={4}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setBloodTestData({
                        ...bloodTestData,
                        [option.api]: event.currentTarget.value.replace(
                          /\D/,
                          '',
                        ),
                      });
                    }}
                  />
                </label>
              ))
            }
          </ScrollArea>
          {!!Object.values(bloodTestData).filter(data => !!data.length)
            .length && (
            <button
              type="button"
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
