import React, { useEffect, useState, useCallback } from 'react';
import HamburgerMenu from 'react-hamburger-menu';
import { Link } from 'react-router-dom';

import Container, { MobileOverlay } from './styles';

import menuItems from '../../menu.json';

import logoImg from '../../assets/logo.png';

interface WindowSizeData {
  width: undefined | number;
  height: undefined | number;
}

const Header: React.FC = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [windowSize, setWindowSize] = useState<WindowSizeData>({
    width: undefined,
    height: undefined,
  });

  const isMobile = windowSize.width && windowSize.width < 768;

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMenuClick = useCallback(
    (event: React.MouseEvent<HTMLElement>, target: string) => {
      event.preventDefault();

      const header = document.getElementById('header');
      const element = document.getElementById(target);

      const headerHeight = header?.getBoundingClientRect().height || 0;
      const elementOffsetTop = element?.offsetTop || 0;

      setToggleMenu(false);

      window.scrollTo(0, elementOffsetTop - headerHeight);
    },
    [],
  );

  return (
    <>
      <Container>
        <Link to="/" className="logo-link">
          <img
            src={logoImg}
            width="300"
            height="107"
            alt="Health Protection"
            title="Health Protection"
          />
        </Link>

        {(toggleMenu || !isMobile) && (
          <ul
            className={` nav-menu ${isMobile ? 'mobile-menu' : 'main-menu'} `}
          >
            {menuItems.map(menuItem => (
              <li key={menuItem.id}>
                <Link
                  to={menuItem.target}
                  className={menuItem.class}
                  onClick={event => handleMenuClick(event, menuItem.target)}
                >
                  {menuItem.title}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {isMobile && (
          <HamburgerMenu
            isOpen={toggleMenu}
            menuClicked={() => {
              setToggleMenu(!toggleMenu);
            }}
            width={18}
            height={16}
            strokeWidth={2}
            rotate={0}
            color="#282933"
            borderRadius={0}
            animationDuration={0.5}
          />
        )}
      </Container>
      <MobileOverlay
        isActive={!!toggleMenu}
        onClick={() => {
          setToggleMenu(false);
        }}
      />
    </>
  );
};

export default Header;
