import React from 'react';
import ReactToolTip from 'react-tooltip';
import { HiQuestionMarkCircle, HiLockClosed } from 'react-icons/hi';
import { TiShoppingCart } from 'react-icons/ti';

import { useApp } from 'contexts/app';

import Products from './components/Products';
import Sidebar from './components/Sidebar';

import Container, {
  StepIntro,
  StepTitle,
  StepDescription,
  StepContent,
  CheckoutProducts,
} from './styles';

const Cart: React.FC = () => {
  const context = useApp();
  const { steps, labels } = context;
  const { step1: initialStep, step2: previousStep } = steps;

  const isActive = previousStep.isCompleted && initialStep.isCompleted;

  return (
    <Container isActive={isActive}>
      <StepIntro>
        <TiShoppingCart size={52} color={isActive ? '#1bc9bd' : '#565656'} />
        <StepTitle>
          {!isActive && <HiLockClosed size={20} className="locked-icon" />}
          {labels.cart_title}
          <HiQuestionMarkCircle
            className="tooltip-icon"
            size={20}
            color={isActive ? '#1bc9bd' : '#565656'}
            data-tip={`<strong>${labels.cart_title}</strong><span>${labels.cart_tooltip}</span>`}
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
            <strong>{labels.step_3_disabled.split('.')[0]}</strong>.
            {labels.step_3_disabled.substr(
              labels.step_3_disabled.indexOf('.') + 1,
            )}
          </div>
        )}
        <StepDescription>{labels.cart_description}</StepDescription>
      </StepIntro>
      {isActive && (
        <StepContent>
          <CheckoutProducts>
            <h4>{labels.cart_subtitle}</h4>
            <Products />
          </CheckoutProducts>
          <Sidebar />
        </StepContent>
      )}
    </Container>
  );
};

export default Cart;
