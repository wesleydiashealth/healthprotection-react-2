import React from 'react';

import Sankey from 'components/Sankey';
// import SankeyMobile from 'components/SankeyMobile';

import { AppProvider } from 'contexts/app';

import Hero from 'components/Hero';
import Wizard from 'components/Wizard';

import Cart from 'components/Cart';
import Habits from 'components/Habits';
import Container from './styles';

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
