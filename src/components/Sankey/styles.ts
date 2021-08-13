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
  isActive?: boolean;
  color?: string;
}

interface FineTuneProps {
  isActive?: boolean;
  color?: string;
}

interface SubstancesProps {
  isActive?: boolean;
}

interface SubstanceProps {
  suboutcomes?: number;
}

const Container = styled.div<ContainerProps>`
  padding: 80px 0 0;

  ${props =>
    props.isActive &&
    css`
      .step-intro {
        h3 {
          strong {
            color: #db71af;
          }
        }
      }
    `}

  .step-intro {
    margin-bottom: 40px;

    text-align: center;
    color: #565656;

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

      strong {
        margin-bottom: 5px;

        display: block;

        color: #db71af;

        font-weight: 600;
        font-size: 16px;
        line-height: 24px;
      }

      span {
        font-weight: normal;
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
    align-items: center;

    .sankey-tooltip {
      width: 640px;
      box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.11);
      border-radius: 20px;

      text-align: left;
      font-family: 'Montserrat';

      strong {
        margin-bottom: 5px;

        display: block;

        color: #7664c8;

        font-weight: 600;
        font-size: 16px;
        line-height: 24px;
      }

      span {
        font-weight: normal;
        font-size: 14px;
        line-height: 22px;
      }
    }
  }
`;

export const Outcomes = styled.div`
  font-weight: 600;

  &:before {
    content: 'Filtered Outcomes';
  }
`;

export const Outcome = styled.div<OutcomeProps>`
  position: relative;

  & ~ div {
    margin-top: 20px;
  }

  span {
    color: #000;
  }

  .anchors {
    display: flex;
    flex-flow: column wrap;

    position: absolute;

    &__item {
      width: 10px;
      height: 58px;
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
    padding: 5px 10px;

    display: flex;
    align-items: center;
    justify-content: flex-start;

    position: relative;
    z-index: 10;

    background: #fde7e8;
    min-height: 45px;

    font-weight: 600;

    min-height: 58px;
  }

  .tooltip-icon {
    margin-right: 5px;
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
        min-height: ${`${58 * props.suboutcomes}px`};
      }
    `}
`;

export const SubOutcomes = styled.div`
  position: relative;

  font-weight: 600;

  &:before {
    content: 'Choose your Sub-outcomes';
  }

  &:after {
    content: 'Fine-tune';
    position: absolute;
    top: 0;
    left: 260px;
  }

  .content {
    display: flex;
  }

  .tooltip-icon {
    margin-right: 5px;
    min-width: fit-content;
  }
`;

export const SubOutcome = styled.div<SubOutcomeProps>`
  margin-top: 10px;
  padding: 5px 20px;

  position: relative;

  min-height: 58px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background: #f2f2f2;

  & ~ div {
    margin-top: 20px;
  }

  .content {
    margin-right: 20px;

    max-width: 170px;

    span {
      padding-right: 5px;

      display: block;

      font-weight: 600;
      font-size: 16px;
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
      height: 58px;
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
      min-height: ${`${58 * props.nutraceutics}px`};
    `}

  ${props =>
    props.isActive &&
    props.color &&
    css`
      background-color: ${transparentize(0.8, props.color)};
    `}
`;

export const FineTune = styled.a<FineTuneProps>`
  cursor: pointer;

  font-size: 14px;
  line-height: 14px;

  ${props => css`
    color: ${props.color};
  `}

  ${props =>
    props.isActive &&
    css`
      color: #fff;
      background: ${props.color};
    `}
`;

export const Substances = styled.div<SubstancesProps>`
  position: relative;

  min-width: 200px;

  align-self: flex-start;

  font-weight: 600;

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
  padding: 10px;

  position: relative;

  display: flex;
  align-items: center;
  justify-content: space-between;

  max-width: 300px;

  background: #f2f2f2;

  & ~ div {
    margin-top: 20px;
  }

  :after {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    content: '';
    position: absolute;
    background-color: rgba(0, 0, 0, 0.3);
    width: 40px;
    top: 0;
    right: 0;
    bottom: 0;
  }

  strong {
    padding-right: 20px;
    position: relative;

    flex: 1;

    font-weight: 600;
    font-size: 14px;
    line-height: 18px;

    &:after {
      border-left: 1px solid #ccc;
      padding-right: 10px;
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
    }
  }

  span {
    color: #565656;
  }

  .content {
    display: flex;
    align-items: center;
  }

  .tooltip-icon {
    margin-right: 5px;
    min-width: fit-content;
  }

  .refresh-icon {
    margin-left: 20px;
    min-width: fit-content;
    position: relative;
    z-index: 5;
  }

  .anchors {
    display: flex;
    flex-flow: column wrap;

    position: absolute;

    &__item {
      width: 10px;
      height: 58px;
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
      min-height: ${`${58 * props.suboutcomes}px`};
    `}
`;

export const PopupContent = styled.div`
  h3 {
    margin-bottom: 20px;
  }

  p {
    margin-bottom: 10px;

    text-align: justify;
    font-size: 14px;
    line-height: 22px;
  }

  a {
    &:not(:last-child) {
      margin-bottom: 20px;
    }

    display: block;

    color: #62a8ea;
    text-align: right;
    font-size: 14px;
    line-height: 22px;
  }
`;

export const PopupList = styled.div`
  h4 {
    font-size: 18px;
    line-height: 22px;

    strong {
      color: #62a8ea;
      font-weight: 600;
    }
  }

  h5 {
    margin: 10px 0;
    padding: 6px 18px;

    color: #62a8ea;
    font-weight: 600;

    background: #f3f3f3;
  }

  .list-item {
    & ~ .list-item {
      margin-top: 40px;
    }
  }
`;

export const PopupListIcons = styled.div`
  margin-bottom: 20px;

  display: flex;

  .icon-wrapper {
    strong {
      margin-bottom: 10px;

      display: block;

      font-weight: 700;
      font-size: 14px;
      line-height: 18px;
    }

    & ~ .icon-wrapper {
      margin-left: 40px;
    }
  }

  .icon-content {
    display: flex;
    align-items: center;

    img {
      margin-right: 10px;
      flex-shrink: 0;
    }
  }
`;

export default Container;
