import React from 'react';
import ReactToolTip from 'react-tooltip';
import { HiQuestionMarkCircle, HiLockClosed } from 'react-icons/hi';
import { GiForkKnifeSpoon } from 'react-icons/gi';
import 'react-dropdown/style.css';

import { useApp } from 'contexts/app';
import Loading from 'components/Loading';

import Habit from './components/Habit';

import Container, {
  StepIntro,
  StepTitle,
  StepDescription,
  ContainerAlert,
  ContainerAlertTitle,
  HabitsContainer,
  HabitInvalidNutraceuticals,
} from './styles';

const Habits: React.FC = () => {
  const context = useApp();
  const { steps, nutraceuticals, selectedNutraceuticals, foods, error } =
    context;
  const { step1: initialStep, step2: previousStep, step3: currentStep } = steps;

  const isActive = previousStep.isCompleted && initialStep.isCompleted;

  const foodsNutraceuticals = foods.reduce(
    (acc: string[], { interactions }) =>
      Array.from(
        new Set([
          ...acc,
          ...interactions.reduce(
            (interaction: string[], nutraceutical) => [
              ...interaction,
              nutraceutical.nutraceuticalSlug,
            ],
            [],
          ),
        ]),
      ),
    [],
  );

  const invalidNutraceuticals = selectedNutraceuticals.filter(
    selectedNutraceutical =>
      !foodsNutraceuticals.includes(selectedNutraceutical),
  );

  const invalidNutraceuticalsTitles = invalidNutraceuticals.map(
    invalidNutraceutical =>
      nutraceuticals.find(
        nutraceutical => nutraceutical.slug === invalidNutraceutical,
      )?.title,
  );

  const invalidNutraceuticalsString = invalidNutraceuticalsTitles.join(', ');
  const invalidNutraceuticalsSeparator = ',';

  const lastComma = invalidNutraceuticalsString.lastIndexOf(
    invalidNutraceuticalsSeparator,
  );

  return (
    <Container id="step_3" isActive={isActive}>
      <StepIntro>
        <GiForkKnifeSpoon size={52} color={isActive ? '#1bc9bd' : '#565656'} />
        <StepTitle>
          {!isActive && <HiLockClosed size={20} />}
          Step 3
          <HiQuestionMarkCircle
            className="tooltip-icon"
            size={20}
            color={isActive ? '#1bc9bd' : '#565656'}
            data-tip="<strong>Step 2</strong><span>We already made a pre-selection...</span>"
            data-for="habits-title-tooltip"
          />
          <ReactToolTip
            id="habits-title-tooltip"
            className="habits-title-tooltip"
            place="bottom"
            type="light"
            effect="solid"
            offset={{ top: 10, left: 10 }}
            html
            backgroundColor="#fff"
          />
        </StepTitle>

        {!isActive && (
          <div className="step-disabled">
            <strong>Step Blocked.</strong>{' '}
            <span>Finish Step 2 to proceed.</span>
          </div>
        )}

        <StepDescription>
          <strong>Fine-tune</strong> by adjusting your food habits
        </StepDescription>
      </StepIntro>
      <ContainerAlert severity="info">
        <ContainerAlertTitle>Download our App</ContainerAlertTitle>
        Help us to train our app for food recognition with artificial
        intelligence
      </ContainerAlert>

      {isActive && (
        <>
          {currentStep.isLoaded ? (
            <>
              <HabitsContainer>
                {!error && (
                  <>
                    {foods.map(food => (
                      <Habit {...food} />
                    ))}
                  </>
                )}
              </HabitsContainer>
              {!!invalidNutraceuticals.length && (
                <HabitInvalidNutraceuticals>
                  For{' '}
                  <strong>
                    {invalidNutraceuticalsString.slice(0, lastComma) +
                      invalidNutraceuticalsString
                        .slice(lastComma)
                        .replace(invalidNutraceuticalsSeparator, ' and')}
                  </strong>{' '}
                  there {invalidNutraceuticals.length > 1 ? 'are' : 'is'} no
                  adjustments to be made. See below for your list of
                  nutraceuticals.
                </HabitInvalidNutraceuticals>
              )}
            </>
          ) : (
            <Loading color="#1bc9bd" />
          )}
        </>
      )}
    </Container>
  );
};

export default Habits;
