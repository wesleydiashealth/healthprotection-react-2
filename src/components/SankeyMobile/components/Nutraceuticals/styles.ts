import styled, { css } from 'styled-components';

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

  ${props =>
    props.isActive &&
    css`
      &:before {
        content: 'Scientific foundation';
      }
    `}
`;

export default Container;
