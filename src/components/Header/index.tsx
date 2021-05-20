import React from 'react';
import { Link } from 'react-router-dom';

import Container from './styles';

import menuItems from '../../menu.json';

import logoImg from '../../assets/logo.png';

const Header: React.FC = () => (
  <Container>
    <Link to="/">
      <img
        src={logoImg}
        width="180"
        height="60"
        alt="Health Protection"
        title="Health Protection"
      />
    </Link>
    <ul>
      {menuItems.map(menuItem => (
        <li key={menuItem.title}>
          <Link to={menuItem.target}>{menuItem.title}</Link>
        </li>
      ))}
    </ul>
  </Container>
);

export default Header;
