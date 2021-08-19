import styled, { css, keyframes } from 'styled-components';
import { transparentize } from 'polished';
import { fadeIn } from 'react-animations';

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

const fadeInAnimation = keyframes`${fadeIn}`;

const Container = styled.div<ContainerProps>`
  margin: 0 auto;
  padding: 20px 5px 0;

  svg {
    animation: 0.5s ${fadeInAnimation};
  }

  @media screen and (min-width: 768px) {
    padding: 20px 50px 0;
  }

  ${props =>
    props.isActive &&
    css`
      h3 {
        strong {
          color: #db71af;
        }
      }
    `}
`;

export const StepIntro = styled.div`
  margin-bottom: 20px;

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

  display: flex;
  justify-content: center;

  font-weight: 600;

  font-size: 18px;
  line-height: 32px;

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

export const StepSubDescription = styled.span`
  font-size: 12px;
  line-height: 16px;

  @media screen and (min-width: 768px) {
    font-size: 18px;
    line-height: 24px;
  }
`;

export const StepContent = styled.div`
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

  > div:before {
    margin-bottom: 10px;

    display: block;

    font-size: 10px;
    line-height: 18px;
  }

  @media screen and (min-width: 768px) {
    margin-bottom: 40px;

    > div:before {
      font-size: 16px;
      line-height: 24px;
    }
  }
`;

export const Outcomes = styled.div`
  align-self: flex-start;

  max-width: 45%;

  font-weight: 600;

  &:before {
    content: 'Filtered Outcomes';
  }

  @media screen and (min-width: 768px) {
    align-self: center;

    max-width: none;
  }
`;

export const Outcome = styled.div<OutcomeProps>`
  border-radius: 20px;

  overflow: hidden;

  position: relative;

  & ~ div {
    margin-top: 20px;
  }

  .anchors {
    display: flex;
    flex-flow: column wrap;

    position: absolute;
    top: 0;

    &__item {
      width: 10px;
      height: 58px;
    }
  }

  .entry-anchors {
    left: 0;
  }

  .exit-anchors {
    right: 0;
  }

  .tooltip-icon {
    margin-right: 5px;
  }

  ${props =>
    props.color &&
    css`
      .outcome-wrapper {
        background-color: ${transparentize(0, props.color)};
      }

      .outcome-list {
        background-color: ${transparentize(0.5, props.color)};
      }
    `}
`;

export const OutcomeContent = styled.div`
  padding: 5px 10px;

  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  position: relative;
  z-index: 10;

  background: #fde7e8;
  max-width: 320px;
  min-height: 45px;

  font-weight: 600;

  min-height: 58px;

  > img {
    margin-right: 10px;

    width: 16qpx;
    height: auto;

    flex-shrink: 0;
  }

  @media screen and (min-width: 768px) {
    padding: 10px 20px;

    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;

    > img {
      width: 48px;
    }
  }
`;

export const OutcomeName = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;

  flex: 1;

  color: #000;
  font-size: 10px;
  line-height: 18px;

  svg {
    margin-left: 5px;

    color: #fff;
    fill: #fff;

    flex-shrink: 0;
  }

  @media screen and (min-width: 768px) {
    font-size: 16px;
    line-height: 24px;
  }
`;

export const OutcomeList = styled.div`
  padding: 10px;

  .list-item {
    position: relative;

    & ~ .list-item {
      margin-top: 10px;
    }
  }

  p {
    font-size: 12px;
  }
`;

export const SubOutcome = styled.div<SubOutcomeProps>`
  padding: 5px 20px;

  position: relative;

  min-height: 58px;

  display: flex;
  flex-flow: column wrap;
  align-items: flex-start;
  justify-content: space-between;

  background: #f2f2f2;

  & ~ div {
    margin-top: 20px;
  }

  .anchors {
    display: flex;
    flex-flow: column wrap;

    position: absolute;
    top: 0;

    &__item {
      width: 5px;
      height: 58px;
    }
  }

  .entry-anchors {
    left: 0;
  }

  .exit-anchors {
    right: 0;
  }

  @media screen and (min-width: 768px) {
    flex-flow: row nowrap;
    align-items: center;
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

export const SubOutcomeContent = styled.div`
  margin: 0 0 10px;

  display: flex;
  flex-flow: row nowrap;

  svg {
    margin-right: 5px;
    flex-shrink: 0;
  }

  @media screen and (min-width: 768px) {
    margin: 0 20px 0 0;

    max-width: 170px;
  }
`;

export const SubOutcomeContentName = styled.span`
  display: block;

  font-weight: 600;
  font-size: 10px;
  line-height: 18px;

  @media screen and (min-width: 768px) {
    padding-right: 5px;

    display: block;

    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
  }
`;

export const FineTuneGroup = styled.div`
  border-radius: 20px;
  padding: 2px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #fff;
`;

export const FineTune = styled.a<FineTuneProps>`
  cursor: pointer;

  font-size: 14px;
  line-height: 14px;

  border-radius: 20px;
  padding: 5px;

  display: inline-block;

  text-decoration: none;
  font-size: 10px;

  & ~ a {
    margin-left: 5px;
  }

  @media screen and (min-width: 768px) {
    padding: 5px 10px;

    font-size: 14px;
  }

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

  max-width: 40%;

  align-self: flex-start;

  font-weight: 600;

  @media screen and (min-width: 768px) {
    max-width: none;
    min-width: 200px;
  }

  ${props =>
    props.isActive &&
    css`
      &:before {
        content: 'Scientific foundation';
      }
    `}
`;

export const Substance = styled.div<SubstanceProps>`
  border-radius: 20px;
  padding: 10px;

  position: relative;

  display: flex;
  flex-flow: column wrap;
  align-items: flex-start;
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
    width: 22px;
    top: 0;
    right: 0;
    bottom: 0;
  }

  .content-inner {
    position: relative;

    display: flex;

    flex: 1;

    font-weight: 600;
    font-size: 10px;
    line-height: 18px;

    svg {
      margin-right: 5px;

      flex-shrink: 0;
    }

    strong {
      display: flex;
      flex-flow: column wrap;
    }
  }

  span {
    color: #565656;

    font-size: 10px;
    line-height: 18px;
  }

  .content {
    display: flex;
    flex-flow: column wrap;
  }

  .refresh-icon {
    min-width: fit-content;

    position: absolute;
    z-index: 5;
    top: calc(50% - 6px);
    right: 5px;
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

  @media screen and (min-width: 768px) {
    flex-flow: row nowrap;

    strong {
      font-size: 14px;
      line-height: 18px;
    }
  }

  ${props =>
    props.suboutcomes &&
    css`
      /* min-height: ${`${58 * props.suboutcomes}px`}; */
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
