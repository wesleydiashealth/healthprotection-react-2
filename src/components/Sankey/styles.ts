import styled, { css } from 'styled-components';

interface FineTuneProps {
  isActive?: boolean;
}

const Container = styled.div`
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
        color: #db71af;
      }
    }

    span {
      color: #565656;

      font-size: 18px;
      line-height: 24px;
    }
  }

  .step-content {
    display: flex;
    justify-content: space-between;

    .sankey-tooltip {
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
  }
`;

export const Outcomes = styled.div`
  > div {
    padding: 20px;
    background: rgba(240, 94, 98, 0.15);

    & ~ div {
      margin-top: 10px;
    }
  }
`;

export const SubOutcomes = styled.div`
  > div {
    padding: 20px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    background: rgba(255, 100, 0, 0.2);

    & ~ div {
      margin-top: 10px;
    }

    .content {
      margin-right: 20px;

      max-width: 200px;

      span {
        padding-right: 5px;

        font-weight: 500;
        font-size: 18px;
        line-height: 26px;
      }
    }

    .fine-tune {
      border-radius: 20px;
      padding: 2px;

      display: flex;
      align-items: center;
      justify-content: center;

      background: #fff;

      a {
        border-radius: 20px;
        padding: 5px 10px;

        display: inline-block;

        text-decoration: none;

        & ~ a {
          margin-left: 5px;
        }
      }
    }
  }
`;

export const Substances = styled.div`
  > div {
    padding: 20px;
    background: rgba(255, 100, 0, 0.2);

    & ~ div {
      margin-top: 10px;
    }
  }
`;

export const FineTune = styled.a<FineTuneProps>`
  cursor: pointer;

  ${props =>
    props.isActive &&
    css`
      color: #fff;
      background: red;
    `}
`;

export default Container;
