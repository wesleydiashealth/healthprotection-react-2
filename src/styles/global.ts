import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  body, input, button, p {
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }

  a {
    &.button {
      border-radius: 30px;
      padding: 14px 28px;

      display: inline-block;
      min-width: 180px;
      background-color: #7664C8;

      color: #fff;
      text-decoration: none;
      text-align: center;
      font-weight: 700;
      font-size: 14px;
      line-height: 18px;
    }
  }

  .content-wrapper {
    margin: 0 auto;
    padding: 0 20px;

    width: 100%;
    max-width: 1800px;
  }

  .mb-10 {
    margin-bottom: 10px !important;
  }

  .popup-overlay {
    max-width: 100vw;
  }

  .popup-content {
    margin: auto;
    border-radius: 16px;

    color: #565656;

    max-width: calc(100vw - 40px);
    width: 100%;

    filter: drop-shadow(10px 10px 26px rgba(0, 0, 0, 0.15));

    .ScrollbarsCustom-Content {
      padding: 30px !important;
    }
  }

  @media screen and (min-width: 768px) {

  }

  @media screen and (min-width: 1320px) {
    .popup-content {
      max-width: 1280px;
    }
  }
`;
