import React, { useContext, useEffect, useCallback, useState } from 'react';
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

const Step2: React.FC = () => {
  const context = useWizard();

  const { steps } = context;
  const { step4: step, step3: previousStep } = steps;

  const carouselContext = useContext(CarouselContext);

  const [stepData, setStepData] = useState<StepData | undefined>();

  const wizardSteps = Object.keys(steps).filter(
    item => !item.includes('_'),
  ).length;

  // useEffect(() => {
  //   api.get('/data-files/anamnese.json').then(response => {
  //     const { data } = response;
  //     setStepData(data[7]);
  //   });
  // }, []);

  useEffect(() => {
    setStepData(WizardJson[1]);
  }, []);

  const handleButtonClick = useCallback(
    value => {
      if (value === 'none') {
        context.updateStep('step4', { isCompleted: true, answers: [value] });
        carouselContext.setStoreState({ currentSlide: 4 });

        return;
      }

      const updatedAllergies = Array.isArray(step.answers) ? step.answers : [];

      if (!step?.answers.includes(value)) {
        updatedAllergies.push(value);
      } else {
        updatedAllergies.splice(step.answers.indexOf(value), 1);
      }

      context.updateStep('step4', { answers: updatedAllergies });
    },
    [context, step, carouselContext],
  );

  return (
    <StepContainer
      isCompleted={step?.isCompleted}
      isDisabled={!previousStep.isCompleted}
    >
      {step?.isCompleted && (
        <HiOutlineCheckCircle
          className="completed-icon"
          size={32}
          color="#1BC9BD"
        />
      )}
      <span>Question 4/{wizardSteps}</span>
      <strong>{stepData?.label}</strong>
      <HiQuestionMarkCircle
        className="tooltip-icon"
        size={20}
        color="#7664C8"
        data-tip={`<strong>${stepData?.label}</strong><span>${stepData?.label}</span>`}
        data-for="step_4_tooltip"
      />
      <ReactToolTip
        id="step_4_tooltip"
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
              type="button"
              onClick={() => {
                handleButtonClick(answer.api);
              }}
              isActive={step?.answers.indexOf(answer.api) > -1}
              name="allergies"
              value={step?.answers}
            >
              {answer.label}
            </Button>
          ))}
      </ScrollArea>
      {step?.answers.length > 0 && step.answers.indexOf('none') === -1 && (
        <CgChevronRightO
          className="advance-button"
          size={28}
          color="#7664C8"
          onClick={() => {
            context.updateStep('step4', {
              isCompleted: true,
              answers: step?.answers,
            });
            carouselContext.setStoreState({ currentSlide: 4 });
          }}
        />
      )}
    </StepContainer>
  );
};

export default Step2;
