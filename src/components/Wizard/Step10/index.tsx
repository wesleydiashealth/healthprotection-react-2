import React, { useContext } from 'react';
import { IoOptionsOutline } from 'react-icons/io5';
import { CarouselContext } from 'pure-react-carousel';

import { useApp } from 'contexts/app';
import { useWizard } from 'contexts/wizard';
import StepContainer from './styles';

const Step10: React.FC = () => {
  const appContext = useApp();
  const { suboutcomes, updateStep } = appContext;

  const wizardContext = useWizard();
  const { steps, resetSteps } = wizardContext;

  const carouselContext = useContext(CarouselContext);
  const { setStoreState } = carouselContext;

  const parentSteps = Object.entries(steps)
    .filter(({ 0: key }) => !key.includes('_'))
    .reverse();

  const excludeQuestion = parentSteps.find(
    ({ 1: parentStep }) => parentStep.isExcluded,
  );

  const excludeQuestionData = excludeQuestion && excludeQuestion[1];

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
    <StepContainer>
      <IoOptionsOutline size={52} color="#DB71AF" />
      {excludeQuestion?.length ? (
        <p>{excludeQuestionData?.excludeMessage}</p>
      ) : (
        <>
          <h3>Well done, now it&apos;s time to fine-tune your goals</h3>
          <p>
            Based on your answers we&apos;ve filtered{' '}
            <strong>{`more than 1,000 nutraceuticals to just ${queryNutraceuticals.length}`}</strong>
          </p>
          <p>
            <strong>
              Go safely to the Step 2 100% risks free based on your answers.
            </strong>
          </p>
          <div className="buttons">
            <button
              type="button"
              name="reset"
              onClick={() => {
                resetSteps();
                setStoreState({ currentSlide: 0 });
              }}
            >
              Reset
            </button>
            <a
              href="#step_2"
              onClick={() => {
                updateStep('step1', { isCompleted: true });
              }}
            >
              Go to Step 2
            </a>
          </div>
        </>
      )}
    </StepContainer>
  );
};

export default Step10;
