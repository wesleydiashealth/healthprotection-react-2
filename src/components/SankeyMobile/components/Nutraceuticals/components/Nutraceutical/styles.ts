import styled, { css } from 'styled-components';

interface ContainerProps {
  connections?: number;
}

const Container = styled.div<ContainerProps>`
  border-radius: 20px;
  padding: 10px;

  position: relative;
  z-index: 10;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background: #f2f2f2;

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

  top: calc(50% - 14px);
  left: 0;

  &,
  & > div {
    height: 28px;
  }
`;

export const Anchor = styled.div`
  position: absolute;
`;

export const ContentContainer = styled.div``;

export const Content = styled.div`
  padding-right: 10px;

  display: flex;
  flex-flow: column wrap;
  align-items: flex-start;

  flex: 1;

  svg {
    width: 16px;
    height: auto;
  }
`;

export const ContentTitle = styled.h4`
  position: relative;

  display: block;

  flex: 1;

  font-weight: 600;
  font-size: 10px;
  line-height: 18px;

  @media screen and (min-width: 768px) {
    font-size: 14px;
    line-height: 18px;
  }
`;

export const ContentDescription = styled.span`
  color: #565656;

  font-size: 10px;
  line-height: 18px;
`;

export default Container;
