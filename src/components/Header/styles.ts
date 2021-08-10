import styled, { css } from 'styled-components';

interface MobileOverlayProps {
  isActive?: boolean;
}

const Container = styled.div`
  padding: 20px;

  box-sizing: border-box;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo-link {
    margin-right: 40px;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  > div {
    min-width: 18px;
  }

  .nav-menu {
    display: flex;
    justify-content: space-between;

    list-style: none;
  }

  .main-menu {
    li {
      display: flex;

      a {
        margin: 18px 14px;
        padding: 4px;
      }

      &:first-child {
        a {
          margin-left: 0;
        }
      }

      &:last-child {
        a {
          margin-right: 0;
        }
      }
    }
  }

  .mobile-menu {
    padding: 20px;

    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;

    z-index: 10;

    flex-flow: column wrap;
    justify-content: flex-start;

    background: white;

    width: 240px;

    li {
      padding: 10px;
    }
  }
`;

export const MobileOverlay = styled.div<MobileOverlayProps>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  visibility: hidden;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);

  ${props =>
    props.isActive &&
    css`
      visibility: visible;
    `}
`;

export default Container;
