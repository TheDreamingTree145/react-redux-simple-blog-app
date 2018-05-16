import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class PostsNew extends Component {
  renderField = (field) => {
    return (
      <div className="form-group">
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        {field.meta.error}
      </div>
    );
  }

// field is an object ... means we want all those properties to be props
// for the input
// Field doesn't know what to show on the screen. It only knows how to
// interact with the data. Component prop takes in a function that should
// return JSX. No parentheses as we are just passing a reference to a function

  render() {
    return (
      <form>
        <Field
          label="Title"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="Categories"
          component={this.renderField}
        />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        />
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
    error.title = "Title must be at least 3 characters long!";
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
})(PostsNew);
