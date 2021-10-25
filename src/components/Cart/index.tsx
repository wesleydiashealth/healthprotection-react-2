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
  const { step2: previousStep } = steps;

  return (
    <Container isActive={previousStep.isCompleted}>
      <StepIntro>
        <TiShoppingCart
          size={52}
          color={previousStep.isCompleted ? '#1bc9bd' : '#565656'}
        />
        <StepTitle>
          {!previousStep.isCompleted && (
            <HiLockClosed size={20} className="locked-icon" />
          )}
          {labels.cart_title}
          <HiQuestionMarkCircle
            className="tooltip-icon"
            size={20}
            color={previousStep.isCompleted ? '#1bc9bd' : '#565656'}
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
        {!previousStep.isCompleted && (
          <div className="step-disabled">
            <strong>Step Blocked.</strong>{' '}
            <span>Finish Step 2 to proceed.</span>
          </div>
        )}
        <StepDescription>{labels.cart_description}</StepDescription>
      </StepIntro>
      {previousStep.isCompleted && (
        <StepContent>
          <CheckoutProducts>
            <h4>{labels.cart_subtitle}</h4>
            <Products />
            {/* <ProductsList>
              {products.map(product => (
                <Product key={product.value}>
                  <div className="product-content">
                    <img
                      src={`${process.env.PUBLIC_URL}/svg/${product.image}`}
                      alt=""
                    />
                    <div className="">
                      <h5>
                        {product.link ? (
                          <a
                            href={product.link}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {product.label}
                          </a>
                        ) : (
                          product.label
                        )}
                      </h5>
                      <span>{product.dosage}</span>
                    </div>
                  </div>
                  <a href="#xpto">{labels.cart_science}</a>
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
                    {labels.cart_remove}
                  </a>
                </Product>
              ))}
            </ProductsList> */}
          </CheckoutProducts>
          <Sidebar />
        </StepContent>
      )}
    </Container>
  );
};

export default Cart;
