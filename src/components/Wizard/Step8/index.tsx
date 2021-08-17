import React, { useState, useContext } from 'react';
import ReactToolTip from 'react-tooltip';
import { HiQuestionMarkCircle, HiOutlineCheckCircle } from 'react-icons/hi';
import { CarouselContext } from 'pure-react-carousel';

import { StepContainer } from '../styles';
import formSteps from '../../../form.json';

import Button from '../../Button';

import { useWizard } from '../../../contexts/wizard';

const Step8: React.FC = () => {
  const currentStep = formSteps[1];

  const context = useWizard();
  const { steps, questions } = context;
  const { step8: step, step8_1: subStep, step7: previousStep } = steps;
  const { 15: currentQuestion } = questions || {};

  // const subSteps = [steps.step6_1, steps.step6_2, steps.step6_3, steps.step6_4];

  // const subStepsCompleted = !!subSteps.filter(item => !!item.isCompleted)
  //   .length;

  const [stepNumber, setStepNumber] = useState<string>('8');
  const [stepTitle, setStepTitle] = useState<string>(
    currentQuestion?.label || '',
  );

  const carouselContext = useContext(CarouselContext);

  const wizardSteps = Object.keys(steps).filter(
    item => !item.includes('_'),
  ).length;

  return (
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
          step?.answers !== 'yes'
            ? currentQuestion?.label
            : currentStep.substep?.title
        }</strong><span>${
          step?.answers !== 'yes'
            ? currentQuestion?.label
            : currentStep.substep?.tooltip
        }</span>`}
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
      {step?.answers !== 'yes' &&
        currentQuestion?.answers &&
        Object.values(currentQuestion?.answers).map(answer => (
          <Button
            key={answer.id}
            type="button"
            onClick={() => {
              context.updateStep('step8', {
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
            name="gender"
            value={step?.answers}
          >
            {answer.label}
          </Button>
        ))}
      {step?.answers === 'yes' && (
        <>
          <input type="file" name="dna_file" id="dna_file" />
          <button
            type="button"
            className="advance-button"
            onClick={() => {
              context.updateStep('step8', {
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
  );
};

export default Step8;
