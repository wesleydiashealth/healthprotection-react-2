import styled from 'styled-components';

const Container = styled.section`
  margin: 0 auto;
  padding: 20px;

  box-sizing: border-box;

  max-width: 1300px;

  color: #565656;

  @media screen and (min-width: 768px) {
    padding: 20px 50px;

    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
  }
`;

export const HeroIntro = styled.div`
  margin-bottom: 40px;

  @media screen and (min-width: 768px) {
    grid-column: 1;
    grid-row: 1;
  }
`;

export const HeroMainTitle = styled.h1`
  margin-bottom: 10px;

  text-transform: uppercase;
  font-weight: 700;
  font-size: 26px;
  line-height: 32px;

  @media screen and (min-width: 768px) {
    font-size: 36px;
    line-height: 44px;
  }

  @media screen and (min-width: 992px) {
    font-size: 52px;
    line-height: 64px;
  }
`;

export const HeroSubTitle = styled.h2`
  margin-bottom: 20px;

  font-family: 'Open Sans';
  font-size: 12px;
  line-height: 16px;

  @media screen and (min-width: 768px) {
    font-size: 18px;
    line-height: 24px;
  }
`;

export const HeroDescription = styled.p`
  margin-bottom: 10px;

  font-family: 'Montserrat';
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;

  @media screen and (min-width: 768px) {
    font-size: 18px;
    line-height: 24px;
  }
`;

export const HeroButton = styled.a``;

export const HeroImage = styled.img`
  margin: 0 auto 30px;

  display: block;

  max-width: 100%;
  max-height: 200px;

  @media screen and (min-width: 768px) {
    margin: 0;

    grid-column: 2;
    grid-row-start: 1;
    grid-row-end: 3;

    max-height: none;
  }
`;

export const HeroList = styled.ul`
  display: flex;
  flex-flow: column wrap;

  @media screen and (min-width: 768px) {
    flex-flow: row nowrap;

    grid-column: 1;
  }
`;

export const HeroListItem = styled.li`
  display: flex;
  align-items: center;

  & ~ li {
    margin: 5px 0 0;
    border-top: 1px solid #e0e0e0;
    padding: 5px 0 0;
  }

  svg {
    margin-right: 10px;
    fill: #db71af;
  }

  @media screen and (min-width: 768px) {
    & ~ li {
      margin: 0 0 0 10px;
      border-top: none;
      border-left: 1px solid #e0e0e0;
      padding: 0 0 0 10px;
    }
  }
`;

export const HeroListItemLink = styled.a`
  color: #db71af;

  text-decoration: none;
  font-weight: 700;
  font-size: 10px;
  line-height: 12px;

  @media screen and (min-width: 768px) {
    font-size: 16px;
    line-height: 22px;
  }

  @media screen and (min-width: 992px) {
    font-size: 18px;
    line-height: 24px;
  }
`;

export const HeroListItemText = styled.span`
  color: #db71af;

  cursor: pointer;

  text-decoration: none;
  font-weight: 700;
  font-size: 10px;
  line-height: 12px;

  @media screen and (min-width: 768px) {
    font-size: 16px;
    line-height: 22px;
  }

  @media screen and (min-width: 992px) {
    font-size: 18px;
    line-height: 24px;
  }
`;

export const HeroListItemPopupContent = styled.div`
  padding: 20px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Container;
