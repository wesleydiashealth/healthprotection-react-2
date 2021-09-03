import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import CustomSankey from '../pages/CustomSankey';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/sankey" exact component={CustomSankey} />
  </Switch>
);

export default Routes;
