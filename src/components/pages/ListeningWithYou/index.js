/* eslint-disable no-cond-assign */
/* eslint-disable class-methods-use-this */
import React from 'react';
import { connect } from 'react-redux';
import { selectScreen } from '../../../actions';

import { SideNav } from '../../common';
import MapContainer from './MapContainer';

const ListeningWithYou = () => (
  <div>

    <SideNav />
    <div style={{ marginLeft: 300, marginTop: 50 }}>
      <MapContainer />
    </div>
  </div>
);

const mapStateToProps = state => ({
  selectedScreen: state.selectedScreen,
});

export default connect(
  mapStateToProps,
  { selectScreen },
)(ListeningWithYou);
