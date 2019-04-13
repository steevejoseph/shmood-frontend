import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from './pages/Landing';
import Home from './pages/Home';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/" component={Landing} />
        </Switch>
      </BrowserRouter>
    );
  }
}
