// bloglist-frontend/src/App.jsx
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Blog from './components/Blog';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import {
  initializeBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from './store/reducers/blogReducer';
import { setNotification } from './store/reducers/notificationReducer';
import {
  initializeUser,
  loginUser,
  logoutUser,
} from './store/reducers/userReducer';

const App = () => {
  const dispatch = useDispatch();
  const blogFormRef = useRef();
  const user = useSelector((state) => state.user);
  console.log('Current user:', user);
  const blogs = useSelector((state) => state.blogs);
  const notification = useSelector((state) => state.notification);

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch, user]);

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    try {
      await dispatch(loginUser({ username, password }));
      event.target.username.value = '';
      event.target.password.value = '';
    } catch (exception) {
      console.log('Login error:', exception);
      dispatch(
        setNotification(
          exception.response?.data?.error || 'Wrong credentials',
          'error'
        )
      );
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleCreateBlog = (blogObject) => {
    dispatch(createBlog(blogObject))
      .then(() => blogFormRef.current.toggleVisibility())
      .catch((error) =>
        dispatch(
          setNotification(
            error.response?.data?.error || 'Error creating blog',
            'error'
          )
        )
      );
  };

  const loginForm = () => (
    <div data-testid="login-form">
      <Notification message={notification.message} type={notification.type} />
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input type="text" name="username" data-testid="username" />
        </div>
        <div>
          password
          <input type="password" name="password" data-testid="password" />
        </div>
        <button type="submit" data-testid="login-button">
          login
        </button>
      </form>
    </div>
  );

  if (!user) {
    return loginForm();
  }

  return (
    <div>
      <Notification message={notification.message} type={notification.type} />
      <h2>Blogs</h2>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>Logout</button>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={handleCreateBlog} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
          user={user}
        />
      ))}
    </div>
  );
};

export default App;
