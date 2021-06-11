import React from 'react';
import { Link } from 'react-router-dom';

import Container from './styles';

import menuItems from '../../menu.json';

import logoImg from '../../assets/logo.png';

const Header: React.FC = () => (
  <Container>
    <div className="content-wrapper">
      <Link to="/">
        <img
          src={logoImg}
          width="300"
          height="107"
          alt="Health Protection"
          title="Health Protection"
        />
      </Link>
      <ul>
        {menuItems.map(menuItem => (
          <li key={menuItem.id}>
            <Link to={menuItem.target} className={menuItem.class}>
              {menuItem.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </Container>
);

export default Header;
