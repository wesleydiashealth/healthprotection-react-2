import styled, { css } from 'styled-components';

interface ContainerProps {
  isActive?: boolean;
}

const Container = styled.div<ContainerProps>`
  ${props =>
    props.isActive &&
    css`
      .step-intro {
        > svg {
          fill: #1bc9bd !important;
        }

        h3 {
          strong {
            color: #1bc9bd;
          }
        }
      }
    `}

  margin-bottom: 40px;

  .step-intro {
    margin-bottom: 40px;

    text-align: center;

    > svg {
      fill: #707070;
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
`;

export default Container;
