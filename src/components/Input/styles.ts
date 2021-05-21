import styled, { css } from 'styled-components';

interface ContainerProps {
  isFilled: boolean;
  isFocused: boolean;
}

const Container = styled.div<ContainerProps>`
  ${props =>
    props.isFocused &&
    css`
      color: red;
      border-color: red;
    `}
`;

export default Container;
