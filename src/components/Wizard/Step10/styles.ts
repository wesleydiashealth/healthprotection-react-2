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

  width: 600px;

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

    text-align: left;

    strong {
      margin-bottom: 5px;

      display: block;

      color: #db71af;

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

  .results {
    margin: 20px 0 10px;

    display: flex;
  }

  .buttons {
    margin-top: 40px;

    display: flex;
    align-items: center;

    button,
    a {
      border: none;
      border-radius: 32px;
      padding: 16px 18px;

      display: inline-block;
      box-sizing: border-box;

      text-decoration: none;
      color: #fff;
      font-weight: 600;
      font-size: 14px;
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

  @media screen and (min-width: 768px) {
    .buttons {
      margin-top: 60px;

      width: 100%;

      justify-content: space-between;

      button,
      a {
        padding: 16px 24px;

        font-size: 18px;
      }
    }
  }
`;

export default StepContainer;
