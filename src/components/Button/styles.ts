import styled, { css } from 'styled-components';

interface ContainerProps {
  isActive?: boolean;
}

const Container = styled.button<ContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border: 1px solid #565656;
  border-radius: 12px;
  padding: 8px 32px;

  background: transparent;

  font-size: 14px;
  line-height: 18px;
  font-weight: 500;

  & ~ button {
    margin-top: 15px;
  }

  ${props =>
    props.isActive &&
    css`
      color: red;
      border-color: red;
    `}
`;

export default Container;
