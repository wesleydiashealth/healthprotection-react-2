import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

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
      color: #7664c8;
      border-color: #7664c8;
      background: ${transparentize(0.9, '#7664c8')};
    `}
`;

export default Container;
