import React from 'react';
import ReactToolTip from 'react-tooltip';
import { HiQuestionMarkCircle, HiLockClosed } from 'react-icons/hi';
import { BsArrowRight } from 'react-icons/bs';
import { FaTimesCircle } from 'react-icons/fa';
import { TiShoppingCart } from 'react-icons/ti';
import { PDFDownloadLink } from '@react-pdf/renderer';

import { useApp } from 'contexts/app';

import ReportDocument from 'components/ReportDocument';

import products from 'products.json';
import Container, {
  StepIntro,
  StepTitle,
  StepDescription,
  StepContent,
  CheckoutProducts,
  ProductsList,
  Product,
  CheckoutSidebar,
} from './styles';

const Cart: React.FC = () => {
  const context = useApp();
  const { steps, labels, answers, excludes, outcomes, suboutcomes, habits } =
    context;
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
            <ProductsList>
              {products.map(product => (
                <Product key={product.value}>
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
            </ProductsList>
          </CheckoutProducts>
          <CheckoutSidebar>
            <div className="newsletter">
              <h4>{labels.newsletter_title}</h4>
              <div className="newsletter-buttons">
                <input type="text" />
                <input type="submit" value="Send" />
              </div>
              <PDFDownloadLink
                document={
                  <ReportDocument
                    {...{ answers, excludes, outcomes, suboutcomes, habits }}
                  />
                }
              >
                Download report
              </PDFDownloadLink>
              <label htmlFor="privacy_policy">
                <input
                  type="checkbox"
                  id="privacy_policy"
                  name="privacy_policy"
                />
                {labels.newsletter_agree}
              </label>
            </div>
            <div className="summary">
              <h4>
                <span>{labels.summary_total}</span> $50.68
              </h4>
              <span className="summary-details">0.54/day</span>
              <em>{labels.summary_description}</em>
              <p>{labels.summary_shipping}</p>
              <button type="button">
                {labels.summary_button} <BsArrowRight size={18} />
              </button>
              <span className="summary-save">
                {labels.summary_save_recommendation}
              </span>
            </div>
          </CheckoutSidebar>
        </StepContent>
      )}
    </Container>
  );
};

export default Cart;
