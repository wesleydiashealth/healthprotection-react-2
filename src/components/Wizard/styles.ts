import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

interface StepContainerProps {
  isCompleted?: boolean;
  isDisabled?: boolean;
}

const Container = styled.div`
  margin: 0 auto;
  padding: 40px 0;

  max-width: 1200px;

  .step-intro {
    margin-bottom: 40px;

    text-align: center;

    h2,
    h3 {
      margin-bottom: 10px;

      color: #565656;
    }

    h2 {
      font-weight: 700;

      font-size: 33px;
      line-height: 40px;
    }

    h3 {
      margin-bottom: 10px;

      font-size: 28px;
      line-height: 34px;

      strong {
        font-weight: 600;
        color: #7664c8;
      }
    }

    span {
      color: #565656;

      font-size: 18px;
      line-height: 24px;
    }
  }
`;

export const StepContainer = styled.div<StepContainerProps>`
  display: flex;
  flex-direction: column;
  position: relative;

  margin: 20px;
  padding: 24px;

  background: #ffffff;

  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.11);
  border-radius: 20px;

  ${props =>
    (props.isCompleted || props.isDisabled) &&
    css`
      opacity: 0.3;

      button {
        pointer-events: none;
      }
    `}

  span {
    margin-bottom: 5px;

    font-size: 12px;
    line-height: 20px;
  }

  strong {
    margin-bottom: 24px;

    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
  }

  .completed-icon {
    position: absolute;
    top: -16px;
    left: calc(50% - 16px);
    background: #fff;
    border-radius: 100%;
  }

  .tooltip-icon {
    position: absolute;
    top: 15px;
    right: 15px !important;
  }

  .step-tooltip {
    width: 260px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.11);
    border-radius: 20px;

    font-size: 14px;
    line-height: 22px;

    strong {
      display: block;
      margin-bottom: 10px;
      font-size: 20px;
      line-height: 28px;
      font-weight: 500;
      color: #7664c8;
    }
  }

  .buttons-list {
    /* height: 240px; */

    > div {
      display: flex;
      flex-direction: column;

      /* button {
        margin-right: 20px;
      } */
    }
  }

  .advance-button {
    margin-top: 20px;
    border: none;
    border-radius: 12px;
    padding: 8px 32px;

    background: #7664c8;
    color: white;

    font-size: 14px;
    line-height: 18px;
    font-weight: 500;

    &:hover {
      background: ${transparentize(0.2, '#7664c8')};
    }
  }
`;

export default Container;
