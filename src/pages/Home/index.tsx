import React from 'react';

import Container from './styles';

import Header from '../../components/Header';
import Hero from '../../components/Hero';

const Home: React.FC = () => (
  <Container className="content-wrapper">
    <Header />
    <Hero />
  </Container>
);

export default Home;
