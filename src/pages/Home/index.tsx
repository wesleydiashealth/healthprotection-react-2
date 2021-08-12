import React from 'react';

import Container from './styles';

import { AppProvider } from '../../contexts/app';

import Hero from '../../components/Hero';
import Wizard from '../../components/Wizard';
import Sankey from '../../components/Sankey';
import Cart from '../../components/Cart';
import Habits from '../../components/Habits';

const Home: React.FC = () => (
  <Container>
    <AppProvider>
      <Hero />
      <Wizard />
      <Sankey />
      <Habits />
      <Cart />
    </AppProvider>
  </Container>
);

export default Home;
