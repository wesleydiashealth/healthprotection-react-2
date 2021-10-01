import styled from 'styled-components';

const Container = styled.div``;

export const ContainerTitle = styled.h3`
  margin-bottom: 20px;
`;

export const ContainerDescription = styled.div`
  margin-bottom: 10px;

  text-align: justify;
  font-size: 14px;
  line-height: 22px;
`;

export const ContainerLink = styled.a`
  display: block;

  color: #62a8ea;
  text-align: right;
  text-decoration: none;
  font-size: 14px;
  line-height: 22px;

  &:not(:last-child) {
    margin-bottom: 20px;
  }

  &:hover {
    text-decoration: underline;
  }
`;

export const ContainerList = styled.div``;

export const ContainerListItem = styled.div`
  & ~ div {
    margin-top: 40px;
  }
`;

export const ContainerListItemTitle = styled.h4`
  font-size: 18px;
  line-height: 22px;

  strong {
    color: #62a8ea;
    font-weight: 600;
  }
`;

export const ContainerListItemDetails = styled.h5`
  margin: 10px 0;
  border-radius: 10px;
  padding: 6px 18px;

  color: #62a8ea;
  font-weight: 600;

  background: #f3f3f3;
`;

export const ContainerListItemDescription = styled.p`
  margin-bottom: 20px;

  text-align: justify;
  font-size: 14px;
  line-height: 22px;
`;

export const ContainerListItemLink = styled.a`
  display: block;
  text-align: right;

  color: #62a8ea;
  text-decoration: none;
  font-size: 14px;
  line-height: 22px;

  &:hover {
    text-decoration: underline;
  }
`;

export const ContainerListIcons = styled.div`
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

export default Container;
