import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Todo from './Todo'

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Todo} />
      </Switch>
    </Router>
  )
}

export default Routes;
