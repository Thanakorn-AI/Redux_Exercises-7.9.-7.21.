// bloglist-frontend/src/store/reducers/userReducer.js
const initialState = null;

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data;
    case 'CLEAR_USER':
      return null;
    default:
      return state;
  }
};

export const loginUser = (credentials) => {
  return async (dispatch) => {
    const user = await loginService.login(credentials);
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