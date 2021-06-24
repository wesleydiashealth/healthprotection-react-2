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

  min-width: 520px;

  background: ${transparentize(0.9, '#db71af')};

  color: #565656;

  svg {
    margin-bottom: 20px;
  }}

  strong {
    margin-bottom: 24px;

    max-width: 240px;
    text-align: center;
    font-size: 18px;
    line-height: 26px;
    font-weight: 700;
  }

  p {
    margin-bottom: 10px;

    text-align: center;
  }

  .results {
    margin: 20px 0 10px;

    display: flex;

    ul {
      list-style: none;

      li {
        font-weight: 600;
        line-height: 24px;
      }
    }
  }

  .buttons {
    margin-top: 20px;

    button, a {
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
      background: #DB71AF;
    }
  }
`;

export default StepContainer;
