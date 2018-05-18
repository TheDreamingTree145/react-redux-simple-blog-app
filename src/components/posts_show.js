import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions/index';
import { Link } from 'react-router-dom';

class PostsShow extends Component {
  componentDidMount() {
    // If we don't want to re-fetch
    // if (!this.props.post)
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
  }

  onDeleteClick = () => {
    // const { id } = this.props.post.id is risky because we are assuming
    // we have the post object
    const { id } = this.props.match.params
    this.props.deletePost(id, () => {
      this.props.history.push('/')
    });
  }

  render() {
    const { post } = this.props;

    if (!post) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Link to="/">Back to Index</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick}
        >
          Delete Post
        </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

// Basically this.props === ownProps here
// Why is state only one post in here?
function mapStateToProps(state, ownProps) {
  return {
    post: state.posts[ownProps.match.params.id]
  };
}

export default connect(mapStateToProps, { fetchPost: fetchPost, deletePost: deletePost })(PostsShow);

// Needs to be responsible for it's own data because we don't know what
// route a user will start at
