import styled from 'styled-components';

const Container = styled.div``;

export const Product = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;

  & ~ div {
    margin-top: 40px;
  }

  @media screen and (min-width: 768px) {
    flex-flow: row nowrap;
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
  text-align: center;
  flex: 1;

  @media screen and (min-width: 768px) {
    text-align: left;
  }
`;

export const ProductContentTitle = styled.h4`
  margin: 20px 0 0;

  @media screen and (min-width: 768px) {
    margin: 0;
  }
`;

export const ProductContentTitleLink = styled.a`
  color: #1bc9bd;
`;

export const ProductContentDosage = styled.span`
  font-size: 12px;
  line-height: 20px;
`;

export const ProductInfo = styled.a`
  margin: 10px 0 0;

  flex: 1;

  color: #1bc9bd;

  @media screen and (min-width: 768px) {
    margin: 0;
  }
`;

export const ProductPrice = styled.span`
  min-width: 60px;
`;

export const ProductBuy = styled.a`
  margin: 20px 0 0;
  border: none;
  border-radius: 32px;
  padding: 8px 16px;

  cursor: pointer;

  font-weight: 700;
  font-size: 14px;
  color: white;
  text-transform: uppercase;
  text-decoration: none;

  background: #ffae30;

  &:hover {
    opacity: 0.7;
  }

  @media screen and (min-width: 768px) {
    margin: 0 0 0 20px;

    font-size: 16px;
  }
`;

export default Container;
