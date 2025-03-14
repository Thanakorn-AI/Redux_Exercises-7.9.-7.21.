// bloglist-frontend/src/store/reducers/userReducer.js
import loginService from '../../services/login'
import blogService from '../../services/blogs'
import axios from 'axios';

const initialState = {
  currentUser: null,
  allUsers: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, currentUser: action.data };
    case 'CLEAR_USER':
      return { ...state, currentUser: null };
    case 'SET_ALL_USERS':
      return { ...state, allUsers: action.data };
    default:
      return state;
  }
};

const refreshUser = async (token) => {
  try {
    const response = await axios.get('/api/users/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // Expect { username, name, id }
  } catch (error) {
    console.error('Failed to refresh user:', error);
    throw error;
  }
};

export const initializeUsers = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/users');
    dispatch({ type: 'SET_ALL_USERS', data: response.data });
  };
};



export const loginUser = (credentials, navigate) => {
  return async (dispatch) => {
    const user = await loginService.login(credentials);
    console.log('Server response:', user);
    blogService.setToken(user.token);
    window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));
    dispatch({ type: 'SET_USER', data: user });
    navigate('/');
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    window.localStorage.removeItem('loggedNoteappUser');
    blogService.setToken(null);
    dispatch({ type: 'CLEAR_USER' });
  };
};

export const initializeUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
    if (!loggedUserJSON) return;

    let user = JSON.parse(loggedUserJSON);
    console.log('Initialized user from localStorage:', user);

    // Check if user has all required fields (e.g., id)
    if (!user.id) {
      console.log('User missing id, refreshing from backend...');
      try {
        user = await refreshUser(user.token); // Fetch full user data
        window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user)); // Update localStorage
        console.log('Refreshed user:', user);
      } catch (error) {
        console.log('Refresh failed, logging out...');
        dispatch(logoutUser()); // Clear invalid session
        return;
      }
    }

    blogService.setToken(user.token);
    dispatch({ type: 'SET_USER', data: user });
  };
};

export default userReducer;