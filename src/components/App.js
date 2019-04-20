import React, { Component } from 'react';
import { Router, BrowserRouter, Route, Switch } from 'react-router-dom';

// history.js
import { createBrowserHistory } from 'history';

import Landing from './pages/Landing';
import Home from './pages/Home';
import NewPlaylistForm from './forms/NewPlaylist';
import ListeningWithYou from './pages/ListeningWithYou';
import PlaylistShow from './pages/PlaylistShow';

export const history = createBrowserHistory({});

export default class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/listening-with-you" component={ListeningWithYou} />
          <Route path="/playlist/new" component={NewPlaylistForm} />
          <Route path="/playlist/:id" component={PlaylistShow} />
          <Route path="/home" component={Home} />
          <Route path="/" component={Landing} />
        </Switch>
      </Router>
    );
  }
}
