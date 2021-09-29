import styled from 'styled-components';

interface ContainerProps {
  isActive?: boolean;
}

const Container = styled.div<ContainerProps>`
  align-self: flex-start;

  max-width: 45%;

  font-weight: 600;

  @media screen and (min-width: 768px) {
    align-self: center;

    max-width: none;
  }
`;

export const ContainerLabel = styled.span`
  margin-bottom: 10px;

  display: block;

  font-size: 10px;
  line-height: 18px;
`;

export default Container;
