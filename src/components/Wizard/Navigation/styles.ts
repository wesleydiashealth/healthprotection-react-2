import styled from 'styled-components';
import { transparentize } from 'polished';

const StepContainer = styled.div`
  margin-bottom: 20px;
  padding: 10px 0;

  display: flex;
  align-items: center;
  justify-content: center;

  > button {
    border: none;
    background: transparent;

    display: flex;
    align-items: center;

    color: #565656;

    font-size: 14px;
    line-height: 14px;

    &:disabled {
      color: ${transparentize(0.5, '#565656')};
    }
  }

  .carousel__back-button {
    svg {
      margin-right: 10px;
    }
  }

  .carousel__next-button {
    svg {
      margin-left: 10px;
    }
  }

  .carousel__dot-group {
    margin: 0 20px;

    display: flex;

    > div {
      display: flex;
    }

    button {
      margin: 0 5px;
      border: none;

      width: 10px;
      height: 10px;
      border-radius: 50%;

      background: #c6c6c6;
    }

    .carousel__dot {
      display: inline-flex;
      justify-content: center;
      align-items: center;

      svg {
        color: #fff;
      }

      &--completed {
        background-color: #1bc9bd;
      }

      &--selected {
        background: ${transparentize(0.2, '#7664c8')};
      }
    }
  }

  @media screen and (min-width: 768px) {
    .carousel__dot-group {
      button {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

export default StepContainer;
