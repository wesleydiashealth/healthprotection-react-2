import React, { useContext, useState, useEffect } from 'react';
import ReactToolTip from 'react-tooltip';
import { HiQuestionMarkCircle, HiOutlineCheckCircle } from 'react-icons/hi';
import { CgChevronRightO } from 'react-icons/cg';
import ScrollArea from 'react-scrollbar';
import { CarouselContext } from 'pure-react-carousel';

// import api from '../../../services/api';
import StepData from '../../../dtos/StepData';

import { StepContainer } from '../styles';

import Button from '../../Button';

import { useWizard } from '../../../contexts/wizard';

import WizardJson from '../../../form2.json';

const Step6: React.FC = () => {
  const context = useWizard();

  const { steps } = context;
  const { step6: step, step5: previousStep, step5_1: previousSubStep } = steps;

  const carouselContext = useContext(CarouselContext);

  const [stepData, setStepData] = useState<StepData | undefined>();

  const wizardSteps = Object.keys(steps).filter(
    item => !item.includes('_'),
  ).length;

  // useEffect(() => {
  //   api.get('/data-files/anamnese.json').then(response => {
  //     const { data } = response;
  //     setStepData(data[11]);
  //   });
  // }, []);

  useEffect(() => {
    setStepData(WizardJson[11]);
  }, []);

  return (
    <StepContainer
      isCompleted={step?.isCompleted}
      isDisabled={!previousStep.isCompleted && !previousSubStep.isCompleted}
    >
      {step?.answers.length > 0 && (
        <HiOutlineCheckCircle
          className="completed-icon"
          size={32}
          color="#1BC9BD"
        />
      )}
      <span>Question 6/{wizardSteps}</span>
      <strong>{stepData?.label}</strong>
      <HiQuestionMarkCircle
        className="tooltip-icon"
        size={20}
        color="#7664C8"
        data-tip={`<strong>${stepData?.label}</strong><span>${stepData?.label}</span>`}
        data-for="step_6_tooltip"
      />
      <ReactToolTip
        id="step_6_tooltip"
        className="step-tooltip"
        place="bottom"
        type="light"
        effect="solid"
        offset={{ top: 10, left: 100 }}
        html
        backgroundColor="#fff"
      />
      <ScrollArea className="buttons-list" smoothScrolling horizontal={false}>
        {stepData?.answers &&
          Object.values(stepData.answers).map(answer => (
            <Button
              key={answer.id}
              type="submit"
              onClick={() => {
                context.updateStep('step6', {
                  isCompleted: true,
                  answers: answer.api,
                });
                carouselContext.setStoreState({ currentSlide: 6 });
              }}
              isActive={step?.answers === answer.api}
              name="category"
              value={step?.answers}
            >
              {answer.label}
            </Button>
          ))}
      </ScrollArea>
      <CgChevronRightO className="advance-button" size={28} color="#7664C8" />
    </StepContainer>
  );
};

export default Step6;
