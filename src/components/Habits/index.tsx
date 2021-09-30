import React, { useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import ReactToolTip from 'react-tooltip';
import { HiQuestionMarkCircle, HiLockClosed } from 'react-icons/hi';
import { GiForkKnifeSpoon } from 'react-icons/gi';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import { useApp } from 'contexts/app';
import Loading from 'components/Loading';
import Tooltip from './components/Tooltip';

import Container, {
  ContainerAlert,
  ContainerAlertTitle,
  HabitsContainer,
  HabitsErrorContainer,
  HabitContainer,
  HabitContainerIntro,
  HabitContainerContent,
  HabitTitle,
  HabitQuestion,
  HabitDosages,
  HabitNutraceuticals,
  HabitNutraceuticalsLabel,
  HabitNutraceuticalsItem,
  HabitInvalidNutraceuticals,
} from './styles';

const Habits: React.FC = () => {
  const context = useApp();
  const { steps, nutraceuticals, selectedNutraceuticals, foods, error } =
    context;
  const { step2: previousStep } = steps;

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

  useEffect(() => {
    ReactToolTip.rebuild();
  });

  return (
    <Container id="step_3" isActive={previousStep.isCompleted}>
      <div className="step-intro content-wrapper">
        <GiForkKnifeSpoon
          size={52}
          color={previousStep.isCompleted ? '#1bc9bd' : '#565656'}
        />
        <h2>
          {!previousStep.isCompleted && (
            <HiLockClosed size={20} className="locked-icon" />
          )}
          Step 3
          <HiQuestionMarkCircle
            className="tooltip-icon"
            size={20}
            color={previousStep.isCompleted ? '#1bc9bd' : '#565656'}
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
        </h2>

        {!previousStep.isCompleted && (
          <div className="step-disabled">
            <strong>Step Blocked.</strong>{' '}
            <span>Finish Step 2 to proceed.</span>
          </div>
        )}

        <h3>
          <strong>Fine-tune</strong> by adjusting your food habits
        </h3>
      </div>
      <ContainerAlert severity="info">
        <ContainerAlertTitle>Download our App</ContainerAlertTitle>
        Help us to train our app for food recognition with artificial
        intelligence
      </ContainerAlert>

      {previousStep.isCompleted && (
        <HabitsContainer>
          {error && <HabitsErrorContainer>{error}</HabitsErrorContainer>}
          {foods.length && !error ? (
            <>
              {foods.map(food => {
                const { title, dosages, interactions, dataSource } = food;

                const nutraceuticalsInteractions = food.interactions.filter(
                  interaction => {
                    return selectedNutraceuticals.includes(
                      interaction.nutraceuticalSlug,
                    );
                  },
                );

                return (
                  <HabitContainer key={food.slug}>
                    <HabitContainerIntro>
                      <img
                        src={food.icon}
                        alt={food.title}
                        title={food.title}
                      />
                    </HabitContainerIntro>
                    <HabitContainerContent>
                      <HabitTitle>
                        {food.title}
                        <HiQuestionMarkCircle
                          className="tooltip-icon"
                          size={20}
                          color={
                            previousStep.isCompleted ? '#1bc9bd' : '#565656'
                          }
                          data-tip={ReactDOMServer.renderToStaticMarkup(
                            <Tooltip
                              {...{ title, dosages, interactions, dataSource }}
                            />,
                          )}
                          data-for="habit-title-tooltip"
                        />
                        <ReactToolTip
                          id="habit-title-tooltip"
                          className="habit-title-tooltip"
                          place="bottom"
                          type="light"
                          effect="solid"
                          offset={{ top: 10, left: 10 }}
                          html
                          backgroundColor="#fff"
                        />
                      </HabitTitle>

                      <HabitQuestion>
                        How many {food.unit} do you consume per week?
                      </HabitQuestion>
                      <HabitDosages>{food.dosages}</HabitDosages>
                      <HabitNutraceuticals>
                        <HabitNutraceuticalsLabel>
                          This food interacts with:
                        </HabitNutraceuticalsLabel>

                        {nutraceuticalsInteractions.map(
                          nutraceuticalsInteraction => (
                            <HabitNutraceuticalsItem
                              key={nutraceuticalsInteraction.nutraceuticalSlug}
                            >
                              <strong>
                                {nutraceuticalsInteraction.nutraceutical}
                              </strong>
                            </HabitNutraceuticalsItem>
                          ),
                        )}
                      </HabitNutraceuticals>
                      <Dropdown
                        options={food.intakeFrequency}
                        value={food.intakeFrequency[0]}
                        placeholder="Select an option"
                      />
                    </HabitContainerContent>
                  </HabitContainer>
                );
              })}
              <HabitInvalidNutraceuticals>
                For <strong>{invalidNutraceuticalsTitles.join(', ')}</strong>{' '}
                there {invalidNutraceuticals.length > 1 ? 'are' : 'is'} no
                adjustments to be made. See below for your list of
                nutraceuticals.
              </HabitInvalidNutraceuticals>
            </>
          ) : (
            <>{!error && <Loading color="#1bc9bd" />}</>
          )}
        </HabitsContainer>
      )}
    </Container>
  );
};

export default Habits;
