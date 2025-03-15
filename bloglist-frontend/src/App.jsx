// bloglist-frontend/src/App.jsx
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';

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

// Components
import NavBar from './components/NavBar';
import BlogView from './components/BlogView';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Users from './components/Users';
import User from './components/User';
import Footer from './components/Footer';

// Styled Components
import { Container, Title, Flex } from './styles/StyledComponents';
import styled from 'styled-components';


const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f9f9f9;
`;


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
      await dispatch(loginUser(credentials, navigate));
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
    navigate('/');
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
    <AppContainer>
      <NavBar user={user} onLogout={handleLogout} />
      
      <Container>
        <Notification message={notification.message} type={notification.type} />
        
        {!user ? (
          <LoginForm onLogin={handleLogin} />
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Title>Blogs</Title>
                  <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
                    <BlogForm createBlog={handleCreateBlog} />
                  </Togglable>
                  
                  <Flex direction="column">
                    {blogs
                      .sort((a, b) => b.likes - a.likes)
                      .map((blog) => (
                        <Blog key={blog.id} blog={blog} user={user} />
                      ))}
                  </Flex>
                </>
              }
            />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/blogs/:id" element={<BlogView />} />
          </Routes>
        )}
      </Container>
      <Footer />
    </AppContainer>
  );
};

export default App;