import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-between;

  > a {
    padding: 20px 40px 20px 0;
  }

  ul {
    display: flex;
    align-items: center;

    list-style: none;

    li {
      margin: 0 10px;

      a {
        padding: 10px;

        text-decoration: none;
      }
    }
  }
`;

export default Container;
