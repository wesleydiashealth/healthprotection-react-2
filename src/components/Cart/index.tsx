import React from 'react';

import Container from './styles';

import stepIcon from '../../assets/step_3_icon.svg';

const Cart: React.FC = () => {
  return (
    <Container id="step_3">
      <div className="step-intro content-wrapper">
        <img src={stepIcon} width="50" height="70" alt="Cart" title="Cart" />
        <h2>Step 3</h2>
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
