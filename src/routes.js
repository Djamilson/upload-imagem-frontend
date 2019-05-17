import React from 'react';
import {
  BrowserRouter, Route, Switch,
} from 'react-router-dom';

import PrivateRoute from './config/PrivateRoute';
import Main from './pages/Main';
import Box from './pages/Box';

/* exact => garante so se a routar for exatamente essa */

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={() => <h1>Are de Login</h1>} />
      <PrivateRoute path="/app" component={() => <h1>Você está logado</h1>} />
      <PrivateRoute path="/new" component={Main} />
      <PrivateRoute path="/box/:id" component={Box} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
