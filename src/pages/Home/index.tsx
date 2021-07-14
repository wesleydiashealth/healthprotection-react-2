import React from 'react';

import Container from './styles';

import { AppProvider } from '../../contexts/app';

import Header from '../../components/Header';
import Hero from '../../components/Hero';
import Wizard from '../../components/Wizard';
import Sankey from '../../components/Sankey';
import Cart from '../../components/Cart';

const Home: React.FC = () => (
  <Container>
    <AppProvider>
      <Header />
      <Hero />
      <Wizard />
      <Sankey />
      <Cart />
    </AppProvider>
  </Container>
);

export default Home;
