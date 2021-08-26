import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

interface OutcomeProps {
  color?: string;
  suboutcomes?: number;
}

export const Container = styled.div<OutcomeProps>`
  margin-top: 10px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  padding: 5px 10px;

  position: relative;

  display: flex;
  align-items: center;

  max-width: 320px;
  min-height: 58px;

  & ~ div {
    margin-top: 20px;
  }

  @media screen and (min-width: 768px) {
    padding: 10px 20px;
  }

  ${props =>
    props.color &&
    css`
      background-color: ${transparentize(0.5, props.color)};
    `}

  ${props =>
    props.suboutcomes &&
    css`
      min-height: ${`${58 * props.suboutcomes}px`};
    `}
`;

export const Anchors = styled.div`
  display: flex;
  flex-flow: column wrap;

  position: absolute;
  top: 0;
`;

export const Anchor = styled.div`
  width: 10px;
  height: 58px;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;

  flex: 1;

  svg {
    margin-left: 5px;

    justify-self: flex-end;
    flex-shrink: 0;
  }
`;

export const ContentIcon = styled.img`
  margin-right: 10px;

  flex-shrink: 0;
`;

export const ContentTitle = styled.h3`
  display: flex;
  align-items: center;
  justify-content: space-between;

  flex: 1;

  color: #000;
  font-size: 12px;
  line-height: 20px;

  @media screen and (min-width: 768px) {
    font-size: 16px;
    line-height: 24px;
  }
`;

export default Container;
