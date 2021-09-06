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
        content: 'Mouse over for Scientific foundation';

        max-width: 180px;
      }
    `}
`;

export default Container;
