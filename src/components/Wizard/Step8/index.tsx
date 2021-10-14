import React, { useState, useContext } from 'react';
import ReactToolTip from 'react-tooltip';
import { HiQuestionMarkCircle, HiOutlineCheckCircle } from 'react-icons/hi';
import { CarouselContext } from 'pure-react-carousel';

import { useWizard } from 'contexts/wizard';
import Button from 'components/Button';

import { StepContainer } from '../styles';

const Step8: React.FC = () => {
  const context = useWizard();
  const { steps, questions } = context;
  const { step8: step, step8_1: subStep, step7: previousStep } = steps;
  const currentQuestion = questions.find(
    question => Number(question.id) === 15,
  );

  const [stepNumber, setStepNumber] = useState<string>('8');
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
        carouselContext.getStoreState().currentSlide !== 7
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
      </span>
      <strong>{stepTitle}</strong>
      <HiQuestionMarkCircle
        className="tooltip-icon"
        size={20}
        color="#7664C8"
        data-tip={`<strong>${
          step?.answers !== 'yes' ? currentQuestion?.label : stepTitle
        }</strong><span>${currentQuestion?.label}</span>`}
        data-for="step_8_tooltip"
      />
      <ReactToolTip
        id="step_8_tooltip"
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
              context.updateStep('step8', {
                index: 8,
                isCompleted: answer.api !== 'yes',
                answers: answer.api,
              });
              if (answer.api !== 'yes') {
                carouselContext.setStoreState({ currentSlide: 8 });
              } else {
                setStepNumber('8.1');
                setStepTitle('Please, input your data:');
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
          <input type="file" name="dna_file" id="dna_file" />
          <button
            type="submit"
            className="advance-button"
            onClick={() => {
              context.updateStep('step8', {
                index: 8,
                isCompleted: true,
                answers: step?.answers,
              });
              carouselContext.setStoreState({ currentSlide: 8 });
            }}
          >
            Next Question
          </button>
          <strong className="step-8-logos-title">
            You can import your DNA Data from:
          </strong>
          <div className="step-8-logos">
            <img src={`${process.env.PUBLIC_URL}/logos/23andme.jpg`} alt="" />
            <img src={`${process.env.PUBLIC_URL}/logos/ancestry.jpg`} alt="" />
            <img
              src={`${process.env.PUBLIC_URL}/logos/familytreedna.jpg`}
              alt=""
            />
            <img
              src={`${process.env.PUBLIC_URL}/logos/myheritagedna.jpg`}
              alt=""
            />
            <img src={`${process.env.PUBLIC_URL}/logos/tellmegen.jpg`} alt="" />
          </div>
        </>
      )}
    </StepContainer>
  ) : (
    <></>
  );
};

export default Step8;
