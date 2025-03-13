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

export const initializeUsers = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/users');
    dispatch({ type: 'SET_ALL_USERS', data: response.data });
  };
};



export const loginUser = (credentials) => {
  return async (dispatch) => {
    const user = await loginService.login(credentials);
    console.log('Server response:', user);
    blogService.setToken(user.token);
    window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));
    dispatch({ type: 'SET_USER', data: user });
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
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      dispatch({ type: 'SET_USER', data: user });
    }
  };
};

export default userReducer;