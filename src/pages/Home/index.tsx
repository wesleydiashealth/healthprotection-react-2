import React from 'react';

import Container from './styles';

import Header from '../../components/Header';
import Hero from '../../components/Hero';
import Wizard from '../../components/Wizard';
import Sankey from '../../components/Sankey';

const Home: React.FC = () => (
  <Container>
    <Header />
    <Hero />
    <Wizard />
    <Sankey />
  </Container>
);

export default Home;
