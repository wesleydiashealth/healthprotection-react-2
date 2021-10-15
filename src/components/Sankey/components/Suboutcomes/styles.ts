import styled from 'styled-components';

const Container = styled.div`
  position: relative;

  align-self: flex-start;

  max-width: 33.33%;

  font-weight: 600;

  @media screen and (min-width: 768px) {
    align-self: center;

    max-width: 420px;
  }
`;

export const ContainerLabel = styled.div`
  margin-bottom: 10px;

  font-family: 'Open Sans', sans-serif;
  text-align: center;

  strong {
    display: block;

    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
  }

  span {
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
  }

  svg {
    margin: 0 5px 0 0;

    width: 20px;
    height: auto;

    vertical-align: sub;
  }
`;

export default Container;
