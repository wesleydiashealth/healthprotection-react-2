import styled from 'styled-components';

const Container = styled.section`
  display: flex;

  height: calc(100vh - 191px);

  position: relative;
`;

export const HeroContent = styled.div`
  max-width: 100%;

  h1,
  h2,
  p {
    display: block;

    max-width: 520px;
    color: #565656;
  }

  h1 {
    margin-bottom: 20px;

    text-transform: uppercase;

    font-weight: 700;
    font-size: 26px;
    line-height: 32px;
  }

  h2 {
    margin-bottom: 42px;

    font-size: 14px;
    line-height: 22px;
  }

  p {
    margin-bottom: 20px;

    font-weight: 700;
    font-size: 18px;
    line-height: 24px;
  }

  a {
    background: #7664c8;
    padding: 20px 40px;
    border-radius: 42px;

    max-width: 270px;

    color: white;

    text-decoration: none;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hero-list {
    margin-top: 100px;
    padding: 40px 0;

    ul {
      margin-bottom: 160px;

      display: flex;
      align-items: center;

      list-style: none;

      li {
        display: flex;
        align-items: center;

        position: relative;

        color: #4f4f4f;

        max-width: 200px;

        & + li {
          margin-left: 24px;
          padding-left: 24px;

          &:before {
            content: '';
            border-left: 2px solid #e0e0e0;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
          }
        }

        svg {
          margin-right: 20px;
        }

        strong {
          display: block;

          font-weight: 700;
          font-size: 18px;
          line-height: 24px;
          color: #db71af;
        }

        span {
          font-size: 14px;
        }
      }
    }
  }

  @media screen and (min-width: 768px) {
    h1 {
      margin-bottom: 40px;

      font-size: 52px;
      line-height: 62px;
    }
  }
`;

export const HeroImage = styled.div`
  padding-right: 80px;
  position: absolute;
  top: 0;
  right: 0;
`;

export default Container;
