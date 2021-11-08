import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { hotjar } from 'react-hotjar';

import GlobalStyle from './styles/global';

import Routes from './routes';

const App: React.FC = () => {
  useEffect(() => {
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
