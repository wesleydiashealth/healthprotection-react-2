import styled from 'styled-components';

const Container = styled.div`
  align-self: flex-start;

  max-width: 33.33%;

  font-weight: 600;

  @media screen and (min-width: 768px) {
    align-self: center;

    max-width: none;
  }
`;

export const ContainerLabel = styled.div`
  margin-bottom: 10px;

  display: block;
  max-width: 180px;

  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
`;

export default Container;
