import styled, { css } from 'styled-components';

interface ContainerProps {
  connections?: number;
  isActive?: boolean;
  color?: string;
}

interface FineTuneProps {
  isActive?: boolean;
  isEmpty?: boolean;
  color?: string;
}

export const Container = styled.div<ContainerProps>`
  padding: 10px;

  position: relative;

  max-width: 100%;

  & ~ & {
    margin-top: 10px;
  }
`;

export const Anchors = styled.div`
  display: flex;
  flex-flow: column wrap;

  position: absolute;

  &.exit-anchors {
    right: 0;
  }

  &,
  & > div {
    height: 28px;
  }
`;

export const Anchor = styled.div`
  position: absolute;
`;

export const Content = styled.div`
  margin: 0 0 10px;

  display: flex;
  flex-flow: row nowrap;

  svg {
    margin-right: 5px;
    flex-shrink: 0;
  }

  @media screen and (min-width: 768px) {
    margin: 0 20px 0 0;

    max-width: 170px;
  }
`;

export const ContentTitle = styled.h3`
  display: block;

  font-weight: 600;
  font-size: 10px;
  line-height: 18px;

  @media screen and (min-width: 768px) {
    padding-right: 5px;

    display: block;

    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
  }
`;

export const FineTuneGroup = styled.div`
  border-radius: 20px;
  padding: 2px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #fff;
`;

export const FineTune = styled.a<FineTuneProps>`
  cursor: pointer;

  font-size: 14px;
  line-height: 14px;

  border-radius: 20px;
  padding: 5px;

  display: inline-block;

  text-decoration: none;
  font-size: 10px;

  & ~ a {
    margin-left: 5px;
  }

  @media screen and (min-width: 768px) {
    padding: 5px 10px;

    font-size: 14px;
  }

  ${props => css`
    color: ${props.color};
  `}

  ${props =>
    props.isActive &&
    css`
      color: #fff;
      background: ${props.color || '#565656'};
    `}

    ${props =>
    props.isEmpty &&
    css`
      cursor: default;
      color: #e5e5e5;
      background: #fff;
    `}
`;

export default Container;
