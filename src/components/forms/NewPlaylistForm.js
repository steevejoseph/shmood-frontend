// @refactor: at some point in time, @Steeve thought it would be good to use
//  app level state for currentPhotoUrl (warning dodging)
// @refactor: May need to get rid of artifacts of currentPhotoUrl's reduxification.

/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { submitPhotoUrl, photoUrlChanged } from '../../actions';
import { reWeburl } from '../../assets/scripts/regex-weburl';

const styles = {
  form: {
    marginTop: 50,
    flesDirection: 'column',
    color: '#fff',
  },
};

class PlaylistNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPhotoUrl: '',
    };
    this.renderField = this.renderField.bind(this);
  }

  onSubmit(values) {
    console.log(values);

    // send url (if there) to azure.
    this.props.submitPhotoUrl(values);
  }

  // field is responsible for saying, "handle this input (with name 'name') specifically"
  renderField(field) {
    const {
      meta: { touched, error },
    } = field;
    const className = `${touched && error ? 'has-danger' : ''}`;

    // Basically, set the state to the entered URL if it is valid,
    //  so we can update the preview image on the fly. 😎
    const { name, value } = field.input;
    if (field && field.input && name === 'imageUrl' && value && value.match(reWeburl)) {
      // console.log('urlly', field.input.value);

      // @refactor: this line throws a warning
      //  react doesn't want us updating state in render, c'est la vie.
      this.setState({ currentPhotoUrl: value });
      // this.props.photoUrlChanged({ currentPhotoUrl: value });
    }

    return (
      <div className={className} style={{ marginTop: 20, marginBottom: 20 }}>
        <label>{field.label}</label>
        {/* shorthand syntax for "pass everything in event object as a prop to the input" */}
        <input className="form-control" type="text" {...field.input} />
        <div className="text-help">{touched ? error : ''}</div>
      </div>
    );
  }

  render() {
    const { handleSubmit, currentPhotoUrl } = this.props;
    const src = currentPhotoUrl || '';
    const { form } = styles;
    return (
      <div className="container" style={form}>
        {/* might wanna @refactor this line (pull binding into constructor) */}
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          {/* label is an arbitrary prop */}
          <Field label="Playlist Name" name="name" component={this.renderField} />
          <Field label="Image URL" name="imageUrl" component={this.renderField} />
          <button type="submit" className="btn btn-primary" style={{ marginTop: 20, marginBottom: 20 }}>
            Submit
          </button>
        </form>
        <h3>Your image preview:</h3>
        <img src={this.state.currentPhotoUrl} alt="" />
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.name) {
    errors.name = 'Playlist must have a name';
  }

  if (!values.imageUrl) {
    errors.imageUrl = 'You must enter an image URL';
  }

  if (values.imageUrl && !values.imageUrl.match(reWeburl)) {
    errors.imageUrl = 'Not a valid image URL.';
  }

  // if errors is empty, form is fine to submit
  // if errors has any properties, redux form assumes form is invalid
  return errors;
}

const mapStateToProps = state => ({
  currentPhotoUrl: state.photo.currentPhotoUrl,
});

export default reduxForm({
  validate,
  form: 'playlistNewForm', // a unique identifier for this form
})(
  connect(
    null,
    { submitPhotoUrl, photoUrlChanged }
  )(PlaylistNew)
);
