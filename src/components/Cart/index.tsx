import React from 'react';
import ReactToolTip from 'react-tooltip';
import { HiQuestionMarkCircle, HiLockClosed } from 'react-icons/hi';
import { BsArrowRight } from 'react-icons/bs';
import { FaTimesCircle } from 'react-icons/fa';
import { TiShoppingCart } from 'react-icons/ti';

import Container, { ProductsList, Product, CheckoutSidebar } from './styles';

import { useApp } from '../../contexts/app';

import products from '../../products.json';

const Cart: React.FC = () => {
  const context = useApp();
  const { steps } = context;
  const { step2: previousStep } = steps;

  return (
    <Container isActive={previousStep.isCompleted}>
      <div className="step-intro content-wrapper">
        <TiShoppingCart
          size={52}
          color={previousStep.isCompleted ? '#1bc9bd' : '#565656'}
        />
        <h2>
          {!previousStep.isCompleted && (
            <HiLockClosed size={20} className="locked-icon" />
          )}
          <strong>Buy</strong> your products
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

        <span>Now you are ready to buy what is best for your health</span>
      </div>

      {previousStep.isCompleted && (
        <div className="step-content content-wrapper">
          <div className="products-wrapper">
            <h4>The safest products for your health</h4>
            <ProductsList>
              {products.map(product => (
                <Product>
                  <div className="product-content">
                    <img
                      src={`${process.env.PUBLIC_URL}/svg/${product.image}`}
                      alt=""
                    />
                    <div className="">
                      <h5>{product.label}</h5>
                      <span>{product.dosage}</span>
                    </div>
                  </div>
                  <a href="#xpto">Science-based information</a>
                  <div className="product-values">
                    <span className="product-price">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      }).format(product.price)}
                    </span>
                    <div className="product-quantity-wrapper">
                      <input
                        type="button"
                        value="-"
                        className="button-minus"
                        data-field="quantity"
                      />
                      <input
                        type="number"
                        step="1"
                        max=""
                        value="1"
                        name="product-quantity"
                        className="quantity-field"
                      />
                      <input
                        type="button"
                        value="+"
                        className="button-plus"
                        data-field="quantity"
                      />
                    </div>
                  </div>
                  <a href="#remover" className="product-remove">
                    <FaTimesCircle />
                    Remove
                  </a>
                </Product>
              ))}
            </ProductsList>
          </div>
          <CheckoutSidebar>
            <div className="newsletter">
              <h4>Get your personalized and detailed report by email:</h4>
              <div className="newsletter-buttons">
                <input type="text" />
                <input type="submit" value="Send" />
              </div>
              <label htmlFor="privacy_policy">
                <input
                  type="checkbox"
                  id="privacy_policy"
                  name="privacy_policy"
                />
                I agree with the privacy policy
              </label>
            </div>
            <div className="summary">
              <h4>
                <span>Total</span> $50.68
              </h4>
              <span className="summary-details">0.54/day</span>
              <em>Your purchase serves for 30 days.</em>
              <p>Shipping duties and taxes will be calculated at checkout</p>
              <button type="button">
                GO TO CHECKOUT <BsArrowRight size={18} />
              </button>
              <span className="summary-save">Save your recommendation</span>
            </div>
          </CheckoutSidebar>
        </div>
      )}
    </Container>
  );
};

export default Cart;
