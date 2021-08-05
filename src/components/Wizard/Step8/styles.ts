import styled from 'styled-components';
import { transparentize } from 'polished';

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;

  margin: 20px;
  border-radius: 20px;
  padding: 24px;

  background: ${transparentize(0.9, '#db71af')};

  color: #565656;

  h3 {
    margin: 20px 0 60px;

    font-weight: 700;
    text-align: center;

    font-size: 16px;
    line-height: 24px;
  }

  p {
    margin-bottom: 10px;

    text-align: center;
    font-size: 14px;
    line-height: 22px;
  }

  strong {
    font-weight: 700;
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

  .results {
    margin: 20px 0 10px;

    display: flex;
  }

  .buttons {
    margin-top: 60px;

    button,
    a {
      display: inline-block;
      border: none;
      border-radius: 32px;
      box-sizing: border-box;
      padding: 16px 24px;
      text-decoration: none;
      color: #fff;
      font-weight: 600;
      font-size: 18px;
      line-height: 1;
    }

    button {
      background: #707070;
    }

    a {
      margin-left: 20px;
      background: #db71af;
    }
  }
`;

export default StepContainer;
