/* eslint-disable no-cond-assign */
/* eslint-disable class-methods-use-this */
import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Form from './Form';
import { SideNav } from '../../common';

const styles = {
  screenDiv: {
    marginTop: 50,
  },
};

const NewPlaylistForm = () => (
  <div>
    <Helmet>
      <style>{'body { background-color: #141719; }'}</style>
    </Helmet>
    <div className="container-fluid" style={{ display: 'flex', paddingTop: 50 }}>
      <SideNav />
      <div style={styles.screenDiv}>
        <Form />
      </div>
    </div>
  </div>
);

const mapStateToProps = state => ({
  selectedScreen: state.selectedScreen,
});

export default connect(
  mapStateToProps,
)(NewPlaylistForm);
