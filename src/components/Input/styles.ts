import styled, { css } from 'styled-components';

interface ContainerProps {
  isFilled: boolean;
  isFocused: boolean;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;

  ${props =>
    props.isFocused &&
    css`
      color: red;
      border-color: red;
    `}
`;

export default Container;
