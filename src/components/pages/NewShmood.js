// https://images.theconversation.com/files/187079/original/file-20170921-21001-12cfk5m.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=496&fit=clip
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Spinner from 'react-spinkit';

class NewShmood extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  // blah() {
  //   const { history } = this.props;
  //   const { playlist } = this.props;
  //   if (playlist) {
  //     const {
  //       playlistBeingGenerated,
  //       playlistGenerationSuccess,
  //       playlistGenerationFail,
  //       playlistPhotoAddSuccess,
  //     } = playlist;

  //     if (playlistGenerationSuccess && playlistPhotoAddSuccess) {
  //       // @refactor: later should be redirecting to page with only new playlist
  //       history.push('/home');
  //     }

  //     if (this.props.playlist.playlistGenerationFail) {
  //       console.log('failed to generate playlist!');
  //     }
  //   }
  // }

  render() {
    const { photoBeingSubmitted, playlistBeingGenerated, playlistPhotoBeingAdded } = this.props;

    if (photoBeingSubmitted || playlistBeingGenerated || playlistPhotoBeingAdded) {
      return <Spinner name="line-scale" color="black" />;
    }

    return <div>done!</div>;
  }
}

const mapStateToProps = state => {
  const { currentPhotoUrl, photoBeingSubmitted } = state.photo;

  const {
    playlistBeingGenerated,
    playlistGenerationSuccess,
    playlistGenerationFail,
    playlistPhotoBeingAdded,
    playlistPhotoAddSuccess,
    playlistPhotoAddFail,
  } = state.playlist;
  return {
    currentPhotoUrl,
    photoBeingSubmitted,
    playlistBeingGenerated,
    playlistGenerationSuccess,
    playlistGenerationFail,
    playlistPhotoBeingAdded,
    playlistPhotoAddSuccess,
    playlistPhotoAddFail,
  };
};

export default withRouter(connect(mapStateToProps)(NewShmood));
