import styled from 'styled-components';

const Container = styled.section`
  display: flex;

  .hero__title {
    color: #565656;
  }

  .hero__list {
    display: flex;

    list-style: none;
    text-align: center;

    li + li {
      margin-left: 40px;
    }
  }
`;

export default Container;
