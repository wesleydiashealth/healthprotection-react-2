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

  :after {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    content: '';
    position: absolute;
    background-color: rgba(0, 0, 0, 0.3);
    width: 34px;
    top: 0;
    right: 0;
    bottom: 0;
  }

  .refresh-icon {
    margin: 10px 0 10px 10px;

    position: relative;
    z-index: 5;

    width: 14px;
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

export const ContentPopup = styled.div`
  overflow-x: hidden;
`;

export const ContentPopupTitle = styled.h3`
  margin-bottom: 20px;
`;

export const ContentPopupDescription = styled.p`
  margin-bottom: 10px;

  text-align: justify;
  font-size: 14px;
  line-height: 22px;
`;

export const ContentPopupLink = styled.a`
  &:not(:last-child) {
    margin-bottom: 20px;
  }

  display: block;

  color: #62a8ea;
  text-align: right;
  font-size: 14px;
  line-height: 22px;
`;

export const ContentPopupList = styled.div`
  h4 {
    font-size: 18px;
    line-height: 22px;

    strong {
      color: #62a8ea;
      font-weight: 600;
    }
  }

  h5 {
    margin: 10px 0;
    padding: 6px 18px;

    color: #62a8ea;
    font-weight: 600;

    background: #f3f3f3;
  }

  .list-item {
    & ~ .list-item {
      margin-top: 40px;
    }
  }
`;

export const ContentPopupListIcons = styled.div`
  margin-bottom: 20px;

  display: flex;

  .icon-wrapper {
    strong {
      margin-bottom: 10px;

      display: block;

      font-weight: 700;
      font-size: 14px;
      line-height: 18px;
    }

    & ~ .icon-wrapper {
      margin-left: 40px;
    }
  }

  .icon-content {
    display: flex;
    align-items: center;

    img {
      margin-right: 10px;
      flex-shrink: 0;
    }
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
