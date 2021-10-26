import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

interface ButtonProps {
  isDisabled?: boolean;
  background?: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;

  margin: 20px;
  border-radius: 20px;
  padding: 24px;

  width: 600px;

  text-align: center;

  background: ${transparentize(0.9, '#db71af')};

  color: #565656;
`;

export const Title = styled.h3`
  margin: 20px 0;

  font-weight: 700;
  text-align: center;

  font-size: 16px;
  line-height: 24px;
`;

export const Description = styled.p`
  font-size: 14px;
  line-height: 22px;

  strong {
    font-weight: 600;
  }
`;

export const Instruction = styled.p`
  margin-top: 20px;

  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
`;

export const Buttons = styled.div`
  margin-top: 20px;

  display: flex;
  align-items: center;

  @media screen and (min-width: 768px) {
    margin-top: 40px;

    width: 100%;

    justify-content: space-between;
  }
`;

export const Button = styled.a<ButtonProps>`
  border: none;
  border-radius: 32px;
  padding: 16px 18px;

  display: inline-block;
  box-sizing: border-box;

  text-decoration: none;
  color: #fff;
  font-weight: 600;
  font-size: 14px;
  line-height: 1;
  background-color: #db71af;

  cursor: pointer;

  & ~ a {
    margin-left: 20px;
  }

  ${props =>
    props.background &&
    css`
      background-color: ${props.background};
    `}

  ${props =>
    props.isDisabled &&
    css`
      cursor: default;
      opacity: 0.4;
      pointer-events: none;
    `}

  @media screen and (min-width: 768px) {
    padding: 16px 24px;

    font-size: 18px;
  }
`;

export default Container;
