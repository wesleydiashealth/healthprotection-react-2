import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import TagManager from 'react-gtm-module';
import { hotjar } from 'react-hotjar';

import GlobalStyle from './styles/global';

import Routes from './routes';

const App: React.FC = () => {
  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-NXX22MR' });
    hotjar.initialize(2690176, 6);
  }, []);

  return (
    <Router>
      <Routes />
      <GlobalStyle />
    </Router>
  );
};

export default App;
