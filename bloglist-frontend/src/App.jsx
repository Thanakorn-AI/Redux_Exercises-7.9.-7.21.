// bloglist-frontend/src/App.jsx
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Blog from './components/Blog';
import Users from './components/Users';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import {
  initializeBlogs,
  createBlog,
} from './store/reducers/blogReducer';
import { setNotification } from './store/reducers/notificationReducer';
import {
  initializeUser,
  loginUser,
  logoutUser,
} from './store/reducers/userReducer';
import User from './components/User';
import BlogView from './components/BlogView';

// Separate Login Form Component
const LoginForm = ({ onLogin }) => {
  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    await onLogin({ username, password });
    event.target.username.value = '';
    event.target.password.value = '';
  };

  return (
    <div data-testid="login-form">
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
};

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const blogFormRef = useRef();
  const user = useSelector((state) => state.user.currentUser);
  const blogs = useSelector((state) => state.blogs);
  const notification = useSelector((state) => state.notification);

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch, user]);

  const handleLogin = async (credentials) => {
    try {
      await dispatch(loginUser(credentials, navigate)); // navigate is available here via Router
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
    navigate('/'); // Optional: redirect to root on logout
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

  return (
      <div>
        <Notification message={notification.message} type={notification.type} />
        {!user ? (
          <LoginForm onLogin={handleLogin} />
        ) : (
          <>
            <nav style={{ marginBottom: 10 }}>
              <Link style={{ marginRight: 10 }} to="/">Blogs</Link>
              <Link style={{ marginRight: 10 }} to="/users">Users</Link>
              <span>
                {user.name} logged in{' '}
                <button onClick={handleLogout}>Logout</button>
              </span>
            </nav>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <h2>Blogs</h2>
                    <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
                      <BlogForm createBlog={handleCreateBlog} />
                    </Togglable>
                    {blogs.map((blog) => (
                      <Blog key={blog.id} blog={blog} user={user} />
                    ))}
                  </>
                }
              />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:id" element={<User />} />
              <Route path="/blogs/:id" element={<BlogView />} />
            </Routes>
          </>
        )}
      </div>
  );
};

export default App;