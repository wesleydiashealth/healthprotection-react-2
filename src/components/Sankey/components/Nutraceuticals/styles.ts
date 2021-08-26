import styled, { css } from 'styled-components';

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

  ${props =>
    props.isActive &&
    css`
      &:before {
        content: 'Scientific foundation';
        position: absolute;
        top: 0;
        left: 0;
      }
    `}
`;

export default Container;
