import styled, { css } from 'styled-components';

interface ContainerProps {
  isActive?: boolean;
}

const Container = styled.div<ContainerProps>`
  padding: 80px 0 0;

  ${props =>
    props.isActive &&
    css`
      .step-intro {
        > svg {
          color: #1bc9bd;
        }

        h3 {
          strong {
            color: #1bc9bd;
          }
        }
      }
    `}

  .step-intro {
    margin-bottom: 40px;

    text-align: center;

    .locked-icon {
      margin-right: 5px;
    }

    h2,
    h3 {
      margin-bottom: 10px;

      color: #565656;
    }

    h2 {
      display: flex;
      justify-content: center;

      font-weight: 700;

      font-size: 33px;
      line-height: 40px;

      strong {
        margin-right: 10px;

        font-weight: 700;
      }
    }

    h3 {
      margin-bottom: 10px;

      font-size: 28px;
      line-height: 34px;

      strong {
        font-weight: 600;
      }
    }

    span {
      display: inline-block;
      max-width: 900px;

      color: #565656;

      font-size: 18px;
      line-height: 26px;
    }

    .tooltip-icon {
      margin-left: 5px;
      display: inline-flex;
    }

    .habits-title-tooltip {
      width: 320px;
      box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.11);
      border-radius: 20px;

      text-align: left;
      font-size: 14px;
      line-height: 22px;

      strong {
        display: block;
        margin-bottom: 10px;
        font-size: 20px;
        line-height: 28px;
        font-weight: 500;
      }

      span {
        font-size: 14px;
        line-height: 22px;
      }
    }

    .step-disabled {
      margin-bottom: 10px;

      strong {
        font-weight: 600;
      }

      &,
      span {
        color: #707070;

        font-size: 14px;
        line-height: 22px;
      }
    }
  }

  .step-content {
    display: flex;
    flex-flow: column;
  }

  .products-wrapper {
    border: 1px solid #c6c6c6;
    border-radius: 12px;
    padding: 20px;

    overflow: hidden;

    flex: 1;

    > h4 {
      margin-bottom: 20px;

      font-weight: 600;

      color: #1bc9bd;
    }
  }

  @media screen and (min-width: 768px) {
    .step-content {
      flex-flow: row nowrap;
    }

    .products-wrapper {
      margin-right: 40px;
    }
  }
`;

export const StepIntro = styled.div`
  width: 100%;
  max-width: 100%;

  color: #565656;
  text-align: center;

  svg {
    &:first-child {
      margin-right: 5px;
    }

    &:last-of-type {
      margin-left: 5px;
    }
  }

  .__react_component_tooltip {
    width: 260px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.11);
    border-radius: 20px;

    text-align: left;

    strong {
      margin-bottom: 5px;

      display: block;

      color: #7664c8;

      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
    }

    span {
      display: block;

      font-weight: normal;
      font-size: 14px;
      line-height: 22px;
    }
  }

  .step-disabled {
    margin-bottom: 10px;

    color: #707070;

    font-family: 'Montserrat';
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
  }

  @media screen and (min-width: 768px) {
    margin-bottom: 40px;
    padding: 0 20px;

    .__react_component_tooltip {
      width: 320px;
    }
  }
`;

export const StepTitle = styled.h2`
  margin-bottom: 10px;

  font-weight: 500;

  font-size: 18px;
  line-height: 32px;

  strong {
    font-weight: 600;
  }

  @media screen and (min-width: 768px) {
    font-weight: 700;

    font-size: 33px;
    line-height: 40px;
  }
`;

export const StepDescription = styled.h3`
  margin-bottom: 10px;

  font-size: 14px;
  line-height: 18px;

  strong {
    font-weight: 600;
  }

  @media screen and (min-width: 768px) {
    font-size: 28px;
    line-height: 34px;
  }
`;

export const ProductsList = styled.div``;

export const Product = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;

  & ~ div {
    margin-top: 40px;
  }

  .product-content {
    display: flex;
    align-items: center;

    flex: 1;

    img {
      margin-right: 20px;

      width: 86px;
      height: auto;
    }

    h5 {
      font-weight: 600;

      font-size: 18px;
      line-height: 26px;
    }

    span {
      font-size: 14px;
      line-height: 22px;
    }
  }

  a {
    margin: 10px 0;

    font-weight: 600;

    color: #1bc9bd;
  }

  .product-values {
    margin: 10px 0;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
  }

  .product-price {
    margin-right: 40px;

    font-weight: 600;
  }

  .product-quantity-wrapper {
    border: 1px solid #c6c6c6;
    border-radius: 19px;

    clear: both;
    position: relative;
    background: #fff;

    input,
    textarea {
      border: none;
      box-sizing: border-box;
      margin: 0;
      outline: none;
      padding: 10px;
    }

    input[type='button'] {
      border: 50%;

      -webkit-appearance: button;
      cursor: pointer;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }

    input[type='button'] {
      border-radius: 50%;

      background-color: #fff;
      min-width: 38px;
      width: auto;
      transition: all 300ms ease;
    }

    .button-minus,
    .button-plus {
      font-weight: bold;
      height: 38px;
      padding: 0;
      width: 38px;
      position: relative;
    }

    .quantity-field {
      width: 40px;
      text-align: center;
    }

    input[type='number'] {
      -moz-appearance: textfield;
      -webkit-appearance: none;
    }
  }

  .product-remove {
    display: flex;
    align-items: center;

    text-decoration: none;
    font-weight: 500;

    font-size: 14px;
    line-height: 22px;

    svg {
      margin-right: 5px;
    }
  }

  @media screen and (min-width: 768px) {
    flex-flow: row nowrap;

    > *:not(:last-child) {
      margin-right: 40px;
    }

    .product-content {
      width: 240px;
    }

    a {
      margin: 0;
    }
  }
`;

export const CheckoutSidebar = styled.div`
  color: #565656;

  .newsletter,
  .summary {
    border-radius: 12px;
    padding: 20px;

    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.11);
  }

  .newsletter {
    margin-bottom: 40px;

    text-align: center;

    h4 {
      margin-bottom: 20px;

      font-size: 20px;
      line-height: 28px;
    }

    .newsletter-buttons {
      margin-bottom: 20px;

      display: flex;
      flex-flow: column;
    }

    input[type='text'] {
      margin: 0 0 20px;
      border: 1px solid #8d8d8d;
      border-radius: 32px;

      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 16px 0px 16px 24px;

      flex: none;
      order: 0;
      flex-grow: 0;
    }

    input[type='submit'] {
      border: none;

      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-self: center;
      padding: 16px 24px;

      position: static;
      left: 68.94%;
      right: 0%;
      top: 0%;
      bottom: 0%;

      font-weight: 700;
      color: white;
      text-transform: uppercase;

      background: #ffae30;
      border-radius: 32px;
    }

    label {
      font-weight: 600;

      font-size: 14px;
      line-height: 22px;
    }

    input[type='checkbox'] {
      margin-right: 10px;
    }
  }

  .summary {
    display: flex;
    flex-flow: column wrap;
    align-items: center;

    h4 {
      font-size: 24px;
      line-height: 32px;

      span {
        font-weight: 600;
      }
    }

    &-details {
      margin-bottom: 20px;

      color: #1bc9bd;

      font-size: 14px;
      line-height: 22px;
    }

    em {
      margin-bottom: 20px;

      font-weight: 600;

      font-size: 14px;
      line-height: 22px;
    }

    p {
      margin-bottom: 20px;

      text-align: center;

      font-size: 14px;
      line-height: 22px;
    }

    button {
      margin-bottom: 20px;

      border: none;

      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 16px 24px;

      font-weight: 700;
      color: white;
      text-transform: uppercase;

      background: #ffae30;
      border-radius: 32px;
    }

    .summary-save {
      color: #1bc9bd;

      font-size: 14px;
      line-height: 22px;
    }
  }

  @media screen and (min-width: 768px) {
    width: 25%;

    .newsletter {
      .newsletter-buttons {
        flex-flow: row nowrap;
      }

      input[type='text'] {
        margin: 0 20px 0 0;

        flex: 1;
      }
    }
  }
`;

export default Container;
