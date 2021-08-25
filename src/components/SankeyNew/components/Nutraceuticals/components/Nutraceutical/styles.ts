import styled from 'styled-components';

const Container = styled.div`
  margin-top: 30px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 10px;

  position: relative;

  display: flex;
  flex-flow: column wrap;
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
    width: 40px;
    top: 0;
    right: 0;
    bottom: 0;
  }
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

  svg {
    margin-right: 5px;
  }
`;

export const ContentPopup = styled.div``;

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
`;

export const ContentDescription = styled.span`
  color: #565656;
`;

export default Container;
