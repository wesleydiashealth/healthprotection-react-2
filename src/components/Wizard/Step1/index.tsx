import React, { useContext, useEffect, useState } from 'react';
import ReactToolTip from 'react-tooltip';
import { HiQuestionMarkCircle, HiOutlineCheckCircle } from 'react-icons/hi';
import { CarouselContext } from 'pure-react-carousel';

// import api from '../../../services/api';
import StepData from '../../../dtos/StepData';

import { StepContainer } from '../styles';

import Button from '../../Button';

import { useWizard } from '../../../contexts/wizard';

import WizardJson from '../../../form2.json';

const Step1: React.FC = () => {
  const context = useWizard();

  const { steps } = context;
  const { step1: step } = steps;

  const carouselContext = useContext(CarouselContext);

  const [stepData, setStepData] = useState<StepData | undefined>();

  const wizardSteps = Object.keys(steps).filter(
    item => !item.includes('_'),
  ).length;

  // useEffect(() => {
  //   api.get('/data-files/anamnese.json').then(response => {
  //     const { data } = response;
  //     setStepData(data[1]);
  //   });
  // }, [context]);

  useEffect(() => {
    setStepData(WizardJson[1]);
  }, []);

  return (
    <StepContainer isCompleted={step.isCompleted}>
      {step.isCompleted && (
        <HiOutlineCheckCircle
          className="completed-icon"
          size={32}
          color="#1BC9BD"
        />
      )}
      <span>Question 1/{wizardSteps}</span>
      <strong>{stepData?.label}</strong>
      <HiQuestionMarkCircle
        className="tooltip-icon"
        size={20}
        color="#7664C8"
        data-tip={`<strong>${stepData?.label}</strong><span>${stepData?.label}</span>`}
        data-for="step_1_tooltip"
      />
      <ReactToolTip
        id="step_1_tooltip"
        className="step-tooltip"
        place="bottom"
        type="light"
        effect="solid"
        offset={{ top: 10, left: 100 }}
        html
        backgroundColor="#fff"
      />
      {stepData?.answers &&
        Object.values(stepData.answers).map(answer => (
          <Button
            key={answer.id}
            type="button"
            onClick={() => {
              context.updateStep('step1', {
                isCompleted: true,
                answers: answer.api,
              });
              carouselContext.setStoreState({ currentSlide: 1 });
            }}
            isActive={step.answers === answer.api}
            name="age"
            value={step.answers}
          >
            {answer.label}
          </Button>
        ))}
    </StepContainer>
  );
};

export default Step1;
