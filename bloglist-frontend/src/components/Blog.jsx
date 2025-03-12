// bloglist-frontend/src/components/Blog.jsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { updateBlog, deleteBlog } from '../store/reducers/blogReducer';

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLike = async () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id };
    dispatch(updateBlog(blog.id, updatedBlog));
  };

  const handleDelete = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog.id));
    }
  };

  const showDeleteButton = user && blog.user.username === user.username;

  return (
    <div style={blogStyle}>
      <div className="blogTitle" data-testid="blog-title">
        {blog.title} {blog.author}
        <button onClick={() => setVisible(!visible)} data-testid="view-toggle">
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      {visible && (
        <div className="blogDetails" data-testid="blog-details">
          <p>URL: {blog.url}</p>
          <p>
            Likes: {blog.likes}{' '}
            <button onClick={handleLike} data-testid={`like-button-${blog.id}`}>
              like
            </button>
          </p>
          <p>User: {blog.user.name}</p>
          {showDeleteButton && (
            <button onClick={handleDelete} data-testid="delete-button">
              delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Blog;