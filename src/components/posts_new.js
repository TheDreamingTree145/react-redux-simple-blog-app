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
      </div>
    );
  }

// field is an object ... means we want all those properties to be props
// for the input

  render() {
    return (
      <form>
        <Field
          label="Title"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Tags"
          name="tags"
          component={this.renderField}
        />
      </form>
    );
  }
}
// Field doesn't know what to show on the screen. It only knows how to
// interact with the data. Component prop takes in a function that should
// return JSX. No parentheses as we are just passing a reference to a function

// Unique name for form in case we had multiple forms on the same page
// Holds true for basic forms
export default reduxForm({
  form: 'PostsNewForm'
})(PostsNew);
