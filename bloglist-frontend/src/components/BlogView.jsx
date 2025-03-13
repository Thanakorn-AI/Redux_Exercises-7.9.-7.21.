// bloglist-frontend/src/components/BlogView.jsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { initializeBlogs, addComment, updateBlog, deleteBlog } from '../store/reducers/blogReducer';
import { useNavigate } from 'react-router-dom';

const BlogView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const currentUser = useSelector((state) => state.user.currentUser); // Get logged-in user
  const blog = blogs.find((b) => b.id === id);
  const [comment, setComment] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!blogs.length) dispatch(initializeBlogs());
  }, [dispatch, blogs]);

  const handleComment = (e) => {
    e.preventDefault();
    dispatch(addComment(id, comment));
    setComment('');
  };

  const handleLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }; // Strip user to ID
    dispatch(updateBlog(id, updatedBlog));
  };

  const handleDelete = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(id));
      // Optionally redirect to homepage after deletion
      navigate('/');
    }
  };

  if (!blog) return null;

  // Ensure comments is an array, default to empty if undefined
  const comments = blog.comments || [];
  console.log('currentUser:', currentUser);
  const showDeleteButton = currentUser && blog.user.id === currentUser.id; // Compare IDs
  console.log('blog:', blog);
  console.log('blog.user:', blog.user);
  console.log('currentUser.id:', currentUser?.id);
  console.log('blog.user.id:', blog.user?.id);
  console.log('showDeleteButton:', showDeleteButton);



  return (
    <div>
      <h2>{blog.title}</h2>
      <p><a href={blog.url}>{blog.url}</a></p>
      <p>
        {blog.likes} likes
        <button onClick={handleLike} data-testid={`like-button-${blog.id}`}>Like</button>
      </p>
      <p>Added by {blog.user.name}</p>
      {showDeleteButton && (
        <button onClick={handleDelete} data-testid="delete-button">Delete</button>
      )}
      <h3>Comments</h3>
      <form onSubmit={handleComment}>
        <input value={comment} onChange={(e) => setComment(e.target.value)} />
        <button type="submit">Add Comment</button>
      </form>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default BlogView;