import styled, { css } from 'styled-components';

interface ContainerProps {
  connections?: number;
}

const Container = styled.div<ContainerProps>`
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 10px;

  position: relative;

  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: space-between;

  max-width: 300px;

  background: #f2f2f2;

  & ~ div {
    margin-top: 20px;
  }

  /* :after {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    content: '';
    position: absolute;
    background-color: rgba(0, 0, 0, 0.3);
    width: 40px;
    top: 0;
    right: 0;
    bottom: 0;
  }

  .refresh-icon {
    margin-left: 20px;
    min-width: fit-content;
    position: relative;
    z-index: 5;
  } */

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

export const Content = styled.div`
  display: flex;
  align-items: center;

  flex: 1;

  svg {
    margin-right: 5px;
  }
`;

export const ContentPopup = styled.div``;

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
  padding-right: 20px;
  position: relative;

  display: block;

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
  color: #565656;
`;

export default Container;
