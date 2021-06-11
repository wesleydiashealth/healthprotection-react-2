import styled from 'styled-components';

const Container = styled.section`
  display: flex;
  align-items: center;

  height: calc(100vh - 191px);

  position: relative;

  > div {
    flex: 1;
  }
`;

export const HeroContent = styled.div`
  margin: 80px 0 0;

  h1 {
    margin-bottom: 40px;

    max-width: 50%;

    color: #565656;

    text-transform: uppercase;

    font-size: 52px;
    line-height: 62px;

    span {
      margin-top: 20px;

      display: block;
      color: #7664c8;

      font-weight: 700;
      font-size: 72px;
      line-height: 88px;
    }
  }

  .hero-list {
    padding: 40px 0;

    background: #fafafa;

    ul {
      margin-bottom: 160px;

      display: flex;
      align-items: center;

      list-style: none;

      li {
        color: #4f4f4f;

        & + li {
          margin-left: 40px;
        }

        svg {
          margin-bottom: 10px;
        }

        strong {
          display: block;

          font-weight: 700;
          font-size: 24px;
          line-height: 32px;
        }

        span {
          font-size: 14px;
        }
      }
    }

    .start-now {
      text-align: center;

      a {
        text-transform: uppercase;
        text-decoration: none;

        font-size: 14px;
        line-height: 14px;

        color: #707070;

        strong {
          display: block;

          font-weight: 700;
        }
      }
    }
  }
`;

export const HeroImage = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

export default Container;
