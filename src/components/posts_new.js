import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions/index';

class PostsNew extends Component {
  renderField = (field) => {
    const { meta: { touched, error } } = field;
    const  className = `form-group ${touched && error ? 'has-danger' : ''}`
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  onSubmit = (values) => {

    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

// field is an object ...field means we want all those properties to be props
// for the input
// Field doesn't know what to show on the screen. It only knows how to
// interact with the data. Component prop takes in a function that should
// return JSX. No parentheses as we are just passing a reference to a function

// Redux passes this.props.handleSubmit... We pass in the onSubmit function
// if everything looks good Redux passes in the values object to our function
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field
          label="Title"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

// values is an object that contains all the values the user has enetered
// on the form. Function needs to create and return an errors object
function validate(values) {
  const errors = {};

  // Validate the inputs from 'values'
  if (!values.title || values.title.length < 3) {
    errors.title = "Title must be at least 3 characters long!";
  }
  if (!values.categories) {
    errors.categories = "Enter at least one category!";
  }
  if (!values.content) {
    errors.content = "Enter some content!";
  }
  // If errors is empty the form is fine to submit
  // If errors has any properties reduxForm assumes forms is invalid
  return errors;
}

// Unique name for form in case we had multiple forms on the same page
// Holds true for basic forms
// validate: validate
export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null, { createPost })(PostsNew)
);
