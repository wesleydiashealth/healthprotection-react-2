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
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
  }

  button {
    cursor: pointer;
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
`;
