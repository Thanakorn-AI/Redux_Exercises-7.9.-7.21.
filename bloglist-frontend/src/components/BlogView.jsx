// bloglist-frontend/src/components/BlogView.jsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { initializeBlogs } from '../store/reducers/blogReducer';
import { addComment } from '../store/reducers/blogReducer';

const BlogView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const blog = blogs.find((b) => b.id === id);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (!blogs.length) dispatch(initializeBlogs());
  }, [dispatch, blogs]);

  const handleComment = (e) => {
    e.preventDefault();
    dispatch(addComment(id, comment));
    setComment('');
  };

  if (!blog) return null;

  return (
    <div>
      <h2>{blog.title}</h2>
      <p><a href={blog.url}>{blog.url}</a></p>
      <p>{blog.likes} likes</p>
      <p>Added by {blog.user.name}</p>
      <h3>Comments</h3>
      <form onSubmit={handleComment}>
        <input value={comment} onChange={(e) => setComment(e.target.value)} />
        <button type="submit">Add Comment</button>
      </form>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default BlogView;