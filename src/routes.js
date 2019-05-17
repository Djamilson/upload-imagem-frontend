import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import PrivateRoute from './config/PrivateRoute';
import Main from './pages/Main';
import Box from './pages/Box';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

/* exact => garante so se a routar for exatamente essa */

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <PrivateRoute path="/app" component={() => <h1>DashBoard Você está logado</h1>} />
      <PrivateRoute path="/new" component={Main} />
      <PrivateRoute path="/box/:id" component={Box} />

      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
