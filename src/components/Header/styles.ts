import styled from 'styled-components';

const Container = styled.div`
  padding: 20px 0;

  .content-wrapper {
    display: flex;
    justify-content: space-between;

    > a {
      padding: 20px 40px 20px 0;
    }
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
        font-weight: 500;
        color: #565656;

        &.has-background {
          border-radius: 8px;
          padding: 12px 44px;

          color: #fff;
          background: #db71af;
        }
      }
    }
  }
`;

export default Container;
