import styled, { css } from 'styled-components';

interface FineTuneProps {
  isActive?: boolean;
}

interface SubstancesProps {
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
      display: flex;
      justify-content: center;

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

    .tooltip-icon {
      margin-left: 5px;
      display: inline-flex;
    }

    .sankey-title-tooltip {
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
        color: #db71af;
      }

      span {
        font-size: 14px;
        line-height: 22px;
      }
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
  &:before {
    content: 'Filtered Outcomes';
  }

  .outcome-wrapper {
    margin-top: 10px;
    padding: 20px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    position: relative;
    z-index: 10;

    background: #fde7e8;
    min-height: 90px;

    font-weight: 600;
  }

  > div {
    & ~ div {
      margin-top: 20px;
    }
  }
`;

export const SubOutcomes = styled.div`
  position: relative;

  &:before {
    content: 'Choose your Sub-outcomes';
  }

  &:after {
    content: 'Fine-tune';
    position: absolute;
    top: 0;
    left: 260px;
  }

  > div {
    margin-top: 10px;
    padding: 10px 20px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    background: #f2f2f2;
    min-height: 90px;

    &.active {
      background: #fde7e8;
    }

    & ~ div {
      margin-top: 20px;
    }

    .content {
      margin-right: 20px;

      max-width: 220px;

      span {
        padding-right: 5px;

        font-weight: 600;
        font-size: 16px;
        line-height: 24px;
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

export const FineTune = styled.a<FineTuneProps>`
  cursor: pointer;

  font-size: 14px;
  line-height: 14px;

  color: #f7aeb0;

  ${props =>
    props.isActive &&
    css`
      color: #fff;
      background: #f7aeb0;
    `}
`;

export const Substances = styled.div<SubstancesProps>`
  position: relative;

  min-width: 200px;

  ${props =>
    props.isActive &&
    css`
      &:before {
        content: 'Scientific foundation';
        position: absolute;
        top: 0;
        right: 0;
      }
    `}

  > div {
    margin-top: 30px;
    padding: 20px;

    display: flex;
    align-items: center;
    justify-content: flex-end;

    background: #f2f2f2;
    min-height: 90px;

    & ~ div {
      margin-top: 20px;
    }

    strong {
      font-weight: 600;

      &:after {
        padding: 0 5px;
        content: '|';
        color: #ccc;
      }
    }

    span {
      color: #565656;
    }
  }
`;

export default Container;
