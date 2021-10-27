import React, { useContext, useRef } from 'react';
import { IoOptionsOutline } from 'react-icons/io5';
import { AiOutlineStop } from 'react-icons/ai';
import { CarouselContext } from 'pure-react-carousel';
import { FormHandles } from '@unform/core';

import { useApp } from 'contexts/app';
import { useWizard } from 'contexts/wizard';
import Container, {
  Title,
  Description,
  Instruction,
  Buttons,
  Button,
} from './styles';

const Step10: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const appContext = useApp();
  const { steps: appSteps, suboutcomes, updateStep } = appContext;

  const { step1: currentStep } = appSteps;

  const wizardContext = useWizard();
  const { steps, resetSteps } = wizardContext;

  const carouselContext = useContext(CarouselContext);
  const { setStoreState } = carouselContext;

  const parentSteps = Object.entries(steps)
    .filter(({ 0: key }) => !key.includes('_'))
    .reverse();

  const excludeStep = parentSteps.find(
    ({ 1: parentStep }) => parentStep.isExcluded,
  );

  const excludeStepData = excludeStep && excludeStep[1];

  const queryNutraceuticals = suboutcomes.reduce(
    (acc: string[], { nutraceuticals }) => {
      const suboutcome = Object.values(nutraceuticals).reduce(
        (subAcc: string[], subNutraceuticals) => {
          return Array.from(new Set([...subAcc, ...subNutraceuticals]));
        },
      );

      return Array.from(new Set([...acc, ...suboutcome]));
    },
    [],
  );

  return (
    <Container>
      {excludeStep?.length ? (
        <>
          <AiOutlineStop size={52} color="#DB71AF" />
          <Title>Sorry, we can´t proceed</Title>
          <Description>{excludeStepData?.excludeMessage}</Description>
        </>
      ) : (
        <>
          <IoOptionsOutline size={52} color="#DB71AF" />
          <Title>Well done, now it&apos;s time to fine-tune your goals</Title>
          <Description>
            Based on your answers we&apos;ve filtered{' '}
            <strong>{`more than 100 nutraceuticals to just ${queryNutraceuticals.length}`}</strong>
          </Description>
          <Instruction>
            Go safely to the Step 2 100% risks free based on your answers.
          </Instruction>
        </>
      )}
      <Buttons>
        <Button
          background="#707070"
          onClick={() => {
            resetSteps();
            updateStep('step1', { ...currentStep, isCompleted: false });
            setStoreState({ currentSlide: 0 });
          }}
        >
          Reset
        </Button>
        <Button
          href="#step_2"
          onClick={() => {
            formRef.current?.submitForm();
          }}
          isDisabled={!!excludeStep?.length}
        >
          Go to Step 2
        </Button>
      </Buttons>
    </Container>
  );
};

export default Step10;
