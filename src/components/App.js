import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from './pages/Landing';
import Home from './pages/Home';
import NewPlaylistForm from './forms/NewPlaylist';
import ListeningWithYou from './pages/ListeningWithYou';
import NewShmood from './pages/NewShmood';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/new-shmood" component={NewShmood} />
          <Route path="/listening-with-you" component={ListeningWithYou} />
          <Route path="/playlist/new" component={NewPlaylistForm} />
          <Route path="/home" component={Home} />
          <Route path="/" component={Landing} />
        </Switch>
      </BrowserRouter>
    );
  }
}
