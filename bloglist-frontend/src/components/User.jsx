// bloglist-frontend/src/components/User.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom'; // Add Link
import { initializeUsers } from '../store/reducers/userReducer';

const User = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.allUsers);
  const user = users.find((u) => u.id === id);

  useEffect(() => {
    if (!users.length) dispatch(initializeUsers());
  }, [dispatch, users]);

  if (!user) return null;

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added Blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default User;