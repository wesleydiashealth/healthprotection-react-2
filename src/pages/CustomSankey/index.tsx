import React from 'react';

import Sankey from 'components/Sankey';

import { AppProvider } from 'contexts/app';

import Container from './styles';

const CustomSankey: React.FC = () => (
  <Container>
    <AppProvider>
      <Sankey />
    </AppProvider>
  </Container>
);

export default CustomSankey;
