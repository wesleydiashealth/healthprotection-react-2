import React from 'react';
import ReactToolTip from 'react-tooltip';
import { HiQuestionMarkCircle, HiLockClosed } from 'react-icons/hi';
import { GiForkKnifeSpoon } from 'react-icons/gi';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import Loading from 'components/Loading';

import { useApp } from 'contexts/app';
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
} from './styles';

const Habits: React.FC = () => {
  const context = useApp();
  const { steps, foods, error } = context;
  const { step2: previousStep } = steps;

  const intakeFrequency = [
    { value: '0', label: 'I don´t consume' },
    { value: '1', label: 'Once a week' },
    { value: '2', label: 'Twice a week' },
    { value: '3+', label: 'Three or more times a week' },
    { value: '4+', label: 'Four or more times a week' },
    { value: '5+', label: 'Five or more times a week' },
    { value: '7+', label: 'Seven or more times a week' },
    { value: '7', label: 'Seven times a week' },
    { value: '8+', label: 'Eight or more times a week' },
    { value: '14', label: 'Fourteen times a week' },
    { value: '21', label: 'Twenty one times a week' },
    { value: '28+', label: 'Twenty eight or more times a week' },
    { value: '1-2', label: 'Once or twice a week' },
    { value: '1-3', label: 'From one to three times a week' },
    { value: '2-3', label: 'From two to three times a week' },
    { value: '3-4', label: 'From three to four times a week' },
    { value: '3-6', label: 'From three to six times a week' },
    { value: '4-7', label: 'From four to seven times a week' },
  ];

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
              {foods.map(food => (
                <HabitContainer key={food.slug}>
                  <HabitContainerIntro>
                    <img src={food.icon} alt={food.title} />
                  </HabitContainerIntro>
                  <HabitContainerContent>
                    <HabitTitle>
                      {food.title}
                      <HiQuestionMarkCircle
                        className="tooltip-icon"
                        size={20}
                        color={previousStep.isCompleted ? '#1bc9bd' : '#565656'}
                        data-tip={food.title}
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
                    <Dropdown
                      options={intakeFrequency}
                      value={intakeFrequency[0]}
                      placeholder="Select an option"
                    />
                  </HabitContainerContent>
                </HabitContainer>
              ))}
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
