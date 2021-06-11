import styled from 'styled-components';

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

export const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  margin: 20px;
  padding: 24px;

  background: #ffffff;

  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.11);
  border-radius: 20px;

  span {
    margin-bottom: 5px;

    font-size: 12px;
    line-height: 20px;
  }

  strong {
    margin-bottom: 24px;

    font-weight: 600;
  }

  svg {
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
    height: 240px;

    > div {
      display: flex;
      flex-direction: column;

      button {
        margin-right: 20px;
      }
    }
  }
`;

export default Container;
