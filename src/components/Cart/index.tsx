import React from 'react';
import ReactToolTip from 'react-tooltip';
import { HiQuestionMarkCircle, HiLockClosed } from 'react-icons/hi';
import { GiForkKnifeSpoon } from 'react-icons/gi';

import Container from './styles';

import { useApp } from '../../contexts/app';

const Cart: React.FC = () => {
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
          <strong>Confirm</strong> if you really need the products
        </h3>
        <span>
          Feel free to add more or remove the items we collected for you. Go to
          payment when you are ready. But we don´t want to fool you. You may
          have habits that already supply your needs.
        </span>
      </div>
    </Container>
  );
};

export default Cart;
