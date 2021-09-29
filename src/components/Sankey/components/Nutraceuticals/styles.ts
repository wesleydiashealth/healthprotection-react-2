import styled from 'styled-components';

interface ContainerProps {
  isActive?: boolean;
}

const Container = styled.div<ContainerProps>`
  position: relative;

  max-width: 33.33%;

  align-self: flex-start;

  font-weight: 600;

  @media screen and (min-width: 768px) {
    max-width: none;
    min-width: 200px;
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
