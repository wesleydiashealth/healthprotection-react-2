import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

interface ContainerProps {
  isActive?: boolean;
}

interface OutcomeProps {
  color?: string;
  suboutcomes?: number;
}

interface SubOutcomeProps {
  nutraceutics?: number;
}

interface FineTuneProps {
  isActive?: boolean;
}

interface SubstancesProps {
  isActive?: boolean;
}

interface SubstanceProps {
  suboutcomes?: number;
}

const Container = styled.div<ContainerProps>`
  ${props =>
    props.isActive &&
    css`
      .step-intro {
        > svg {
          color: #db71af;
        }

        h3 {
          strong {
            color: #db71af;
          }
        }
      }
    `}

  margin-bottom: 40px;

  .step-intro {
    margin-bottom: 40px;

    text-align: center;
    color: #565656;

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
`;

export const Outcome = styled.div<OutcomeProps>`
  position: relative;

  & ~ div {
    margin-top: 20px;
  }

  .anchors {
    display: flex;
    flex-flow: column wrap;

    position: absolute;

    &__item {
      width: 10px;
      height: 68px;
    }
  }

  .entry-anchors {
    top: 0;
    left: 0;
  }

  .exit-anchors {
    top: 0;
    right: 0;
  }

  .outcome-wrapper {
    margin-top: 10px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    padding: 10px 20px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    position: relative;
    z-index: 10;

    background: #fde7e8;
    min-height: 45px;

    font-weight: 600;

    min-height: 68px;
  }

  ${props =>
    props.color &&
    css`
      .outcome-wrapper {
        background-color: ${transparentize(0.5, props.color)};
      }
    `}

  ${props =>
    props.suboutcomes &&
    css`
      .outcome-wrapper {
        min-height: ${`${68 * props.suboutcomes}px`};
      }
    `}
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
`;

export const SubOutcome = styled.div<SubOutcomeProps>`
  margin-top: 10px;
  padding: 10px 20px;

  position: relative;

  min-height: 68px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background: #f2f2f2;

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
      font-size: 14px;
      line-height: 22px;
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

  .anchors {
    display: flex;
    flex-flow: column wrap;

    position: absolute;

    &__item {
      width: 10px;
      height: 68px;
    }
  }

  .entry-anchors {
    top: 0;
    left: 0;
  }

  .exit-anchors {
    top: 0;
    right: 0;
  }

  ${props =>
    props.nutraceutics &&
    css`
      min-height: ${`${68 * props.nutraceutics}px`};
    `}
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
`;

export const Substance = styled.div<SubstanceProps>`
  margin-top: 30px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 10px 20px;

  position: relative;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  background: #f2f2f2;
  min-height: 68px;

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

  .anchors {
    display: flex;
    flex-flow: column wrap;

    position: absolute;

    &__item {
      width: 10px;
      height: 68px;
    }
  }

  .entry-anchors {
    top: 0;
    left: 0;
  }

  .exit-anchors {
    top: 0;
    right: 0;
  }

  ${props =>
    props.suboutcomes &&
    css`
      min-height: ${`${68 * props.suboutcomes}px`};
    `}
`;

export default Container;
