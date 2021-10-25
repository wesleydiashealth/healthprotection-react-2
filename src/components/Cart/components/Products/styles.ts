import styled from 'styled-components';

const Container = styled.div``;

export const Product = styled.div`
  display: flex;
  align-items: center;

  & ~ div {
    margin-top: 20px;
  }
`;

export const ProductImage = styled.img`
  width: 64px;
  height: auto;

  @media screen and (min-width: 768px) {
    margin-right: 20px;
  }
`;

export const ProductContent = styled.div`
  flex: 1;
`;

export const ProductContentTitle = styled.h4``;

export const ProductContentTitleLink = styled.a`
  color: #1bc9bd;
`;

export const ProductContentDosage = styled.span`
  font-size: 12px;
  line-height: 20px;
`;

export const ProductInfo = styled.a`
  flex: 1;

  color: #1bc9bd;
`;

export const ProductPrice = styled.span`
  min-width: 60px;
`;

export default Container;
