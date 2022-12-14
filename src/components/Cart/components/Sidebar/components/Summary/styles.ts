import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
`;

export const Title = styled.h4`
  font-size: 24px;
  line-height: 32px;

  span {
    font-weight: 600;
  }
`;

export const Details = styled.span`
  margin-bottom: 20px;

  color: #1bc9bd;

  font-size: 14px;
  line-height: 22px;
`;

export const Description = styled.em`
  margin-bottom: 20px;

  font-weight: 600;

  font-size: 14px;
  line-height: 22px;
`;

export const Shipping = styled.p`
  margin-bottom: 20px;

  text-align: center;

  font-size: 14px;
  line-height: 22px;
`;

export const CheckoutButton = styled.button`
  margin-bottom: 10px;
  border: none;
  border-radius: 32px;
  padding: 16px 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;

  font-weight: 700;
  color: white;
  text-transform: uppercase;

  background: #ffae30;

  svg {
    margin-left: 10px;
  }
`;

export const SaveRecommendation = styled.p`
  color: #1bc9bd;

  font-size: 14px;
  line-height: 22px;
`;

export default Container;
