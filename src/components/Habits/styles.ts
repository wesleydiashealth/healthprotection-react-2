import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { Alert, AlertTitle } from '@material-ui/lab';

interface ContainerProps {
  isActive?: boolean;
}

const Container = styled.div<ContainerProps>`
  margin: 80px auto 0;
  padding: 0 10px;

  position: relative;

  max-width: 1300px;

  ${props =>
    props.isActive &&
    css`
      .step-intro {
        > svg {
          color: #1bc9bd;
        }

        h3 {
          strong {
            color: #1bc9bd;
          }
        }
      }
    `}

  .step-intro {
    margin-bottom: 40px;

    text-align: center;

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
      display: inline-block;
      max-width: 900px;

      color: #565656;

      font-size: 18px;
      line-height: 26px;
    }

    .tooltip-icon {
      margin-left: 5px;
      display: inline-flex;
    }

    .habits-title-tooltip {
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

    @media screen and (min-width: 768px) {
      padding: 80px 50px 0;
    }
  }
`;

export const ContainerAlert = styled(Alert)`
  margin: 0 0 40px 0;
  position: relative;

  background-color: ${transparentize(0.8, '#1bc9bd')} !important;

  svg {
    color: #1bc9bd;
  }

  @media screen and (min-width: 768px) {
    position: absolute;

    top: 50px;
    right: 0;

    max-width: 360px;
  }
`;

export const ContainerAlertTitle = styled(AlertTitle)`
  color: #1bc9bd;

  font-family: 'Montserrat', sans-serif !important;
  font-weight: 600 !important;
`;

export const HabitsContainer = styled.div`
  display: flex;
  flex-flow: column wrap;

  @media screen and (min-width: 768px) {
    flex-flow: row wrap;
  }
`;

export const HabitContainer = styled.div`
  margin-bottom: 40px;

  display: flex;
  align-items: center;

  width: 100%;

  @media screen and (min-width: 768px) {
    width: calc(50% - 20px);

    &:nth-child(odd) {
      margin-right: 40px;
    }
  }
`;

export const HabitContainerIntro = styled.div`
  margin-right: 20px;

  img {
    max-width: 60px;
    height: auto;
  }

  @media screen and (min-width: 768px) {
    img {
      max-width: 120px;
    }
  }
`;

export const HabitContainerContent = styled.div`
  max-width: 100%;

  h4 {
    color: #565656;

    font-weight: 600;

    font-size: 18px;
    line-height: 26px;

    svg {
      margin-left: 5px;
    }
  }

  p {
    margin-bottom: 10px;

    font-size: 14px;
    line-height: 22px;
  }

  .Dropdown-root {
    width: 360px;

    font-size: 14px;
    line-height: 22px;

    .Dropdown-control {
      border-radius: 12px;
      padding: 8px 52px 8px 20px;

      min-height: 44px;

      display: flex;
      align-items: center;
    }

    .Dropdown-menu {
      border-radius: 12px;
    }

    .Dropdown-arrow {
      top: 19px;
    }
  }
`;

export const HabitTitle = styled.h4`
  margin-bottom: 10px;
`;

export const HabitQuestion = styled.span`
  display: block;

  font-size: 16px;
  line-height: 24px;
`;

export const HabitDosages = styled.span`
  margin-bottom: 20px;

  display: block;

  font-size: 14px;
  line-height: 20px;
`;

export default Container;
