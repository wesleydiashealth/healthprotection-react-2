import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

interface ContainerProps {
  connections?: number;
  isActive?: boolean;
  color?: string;
}

interface FineTuneProps {
  isActive?: boolean;
  color?: string;
}

export const Container = styled.div<ContainerProps>`
  padding: 5px 20px;

  position: relative;

  min-height: 58px;

  display: flex;
  flex-flow: column wrap;
  align-items: flex-start;
  justify-content: space-between;

  background: #f2f2f2;

  & ~ div {
    margin-top: 20px;
  }

  @media screen and (min-width: 768px) {
    flex-flow: row nowrap;
    align-items: center;
  }

  ${props =>
    props.connections &&
    css`
      min-height: ${`${58 * props.connections}px`};
    `}

  ${props =>
    props.isActive &&
    props.color &&
    css`
      background-color: ${transparentize(0.8, props.color)};
    `}
`;

export const Anchors = styled.div``;

export const Anchor = styled.div``;

export const Content = styled.div``;

export const ContentTitle = styled.h3``;

export const FineTuneGroup = styled.div``;

export const FineTune = styled.a<FineTuneProps>`
  ${props => css`
    color: ${props.color};
  `}

  ${props =>
    props.isActive &&
    css`
      color: #fff;
      background: ${props.color};
    `}
`;

export default Container;
