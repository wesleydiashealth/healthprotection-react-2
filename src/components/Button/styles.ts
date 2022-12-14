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

  color: #565656;

  background: transparent;

  font-family: 'Montserrat';
  font-size: 11px;
  line-height: 16px;
  font-weight: 500;

  & ~ button {
    margin-top: 15px;
  }

  @media screen and (min-width: 768px) {
    font-size: 14px;
    line-height: 18px;
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
