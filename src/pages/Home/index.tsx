import React from 'react';

import Container from './styles';

import Header from '../../components/Header';
import Hero from '../../components/Hero';
import Wizard from '../../components/Wizard';

const Home: React.FC = () => (
  <Container className="content-wrapper">
    <Header />
    <Hero />
    <Wizard />
  </Container>
);

export default Home;
