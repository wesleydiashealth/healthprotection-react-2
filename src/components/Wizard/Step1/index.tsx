import React, { useContext, useEffect } from 'react';
import ReactToolTip from 'react-tooltip';
import { HiQuestionMarkCircle, HiOutlineCheckCircle } from 'react-icons/hi';
import { CarouselContext } from 'pure-react-carousel';

import api from '../../../services/api';

import { StepContainer } from '../styles';
import formSteps from '../../../form.json';

import Button from '../../Button';

import { useWizard } from '../../../contexts/wizard';

const Step1: React.FC = () => {
  const currentStep = formSteps[0];

  const context = useWizard();

  const { steps } = context;

  const carouselContext = useContext(CarouselContext);

  useEffect(() => {
    api
      .get('/data-files/anamnese.json', {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        proxy: {
          host: 'localhost',
          port: 3000,
        },
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <StepContainer isCompleted={steps.step1.isCompleted}>
      {steps.step1.isCompleted && (
        <HiOutlineCheckCircle
          className="completed-icon"
          size={32}
          color="#1BC9BD"
        />
      )}
      <span>Question 1/{formSteps.length}</span>
      <strong>{currentStep.label}</strong>
      <HiQuestionMarkCircle
        className="tooltip-icon"
        size={20}
        color="#7664C8"
        data-tip={`<strong>${currentStep.title}</strong><span>${currentStep.tooltip}</span>`}
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
      {currentStep.options.map(option => (
        <Button
          key={option.value}
          type="button"
          onClick={() => {
            context.updateStep('step1', {
              isCompleted: true,
              content: option.value,
            });
            carouselContext.setStoreState({ currentSlide: 1 });
          }}
          isActive={steps.step1.content === option.value}
          name="age"
          value={steps.step1.content}
        >
          {option.label}
        </Button>
      ))}
    </StepContainer>
  );
};

export default Step1;
