import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

interface ContainerProps {
  connections?: number;
}

const Container = styled.div<ContainerProps>`
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 10px;

  position: relative;

  cursor: pointer;

  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: space-between;

  box-sizing: border-box;

  max-width: 300px;

  background-color: ${transparentize(0.95, '#000')};

  :hover {
    background-color: ${transparentize(0.8, '#000')};
  }

  & ~ div {
    margin-top: 20px;
  }

  @media screen and (min-width: 768px) {
    flex-flow: row nowrap;
  }

  ${props =>
    props.connections &&
    css`
      min-height: ${`${58 * props.connections}px`};
    `}
`;

export const Anchors = styled.div`
  display: flex;
  flex-flow: column wrap;

  position: absolute;
  top: 0;
  left: 0;
`;

export const Anchor = styled.div`
  width: 10px;
  height: 58px;
`;

export const ContentContainer = styled.div`
  display: flex;
  align-items: center;

  flex: 1;

  svg {
    margin-right: 5px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
`;

export const ContentTitle = styled.h4`
  padding-right: 20px;
  position: relative;

  display: flex;
  align-items: center;

  flex: 1;

  font-weight: 600;
  font-size: 10px;
  line-height: 18px;

  &:after {
    border-left: 1px solid #ccc;
    padding-right: 10px;
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
  }

  @media screen and (min-width: 768px) {
    font-size: 14px;
    line-height: 18px;
  }
`;

export const ContentDescription = styled.span`
  min-width: 80px;

  color: #565656;
  text-align: right;
`;

export default Container;
