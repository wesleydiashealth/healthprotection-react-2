import React from 'react';
import ReactToolTip from 'react-tooltip';
import { HiQuestionMarkCircle, HiLockClosed } from 'react-icons/hi';
import { GiForkKnifeSpoon } from 'react-icons/gi';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import Container, { HabitsContainer, HabitContainer } from './styles';

import { useApp } from '../../contexts/app';

import habits from '../../habits.json';

const Habits: React.FC = () => {
  const context = useApp();
  const { steps } = context;
  const { step2: previousStep } = steps;

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

      {previousStep.isCompleted && (
        <HabitsContainer className="content-wrapper">
          {habits.map(habit => (
            <HabitContainer>
              <div className="habit-intro">
                <img
                  src={`${process.env.PUBLIC_URL}/icons/${habit.image}`}
                  alt=""
                />
                <h4>{habit.title}</h4>
              </div>
              <div className="habit-content">
                <p>{habit.question}</p>
                <Dropdown
                  options={habit.answers}
                  value={habit.answers[0]}
                  placeholder="Select an option"
                />
              </div>
            </HabitContainer>
          ))}
        </HabitsContainer>
      )}
    </Container>
  );
};

export default Habits;
