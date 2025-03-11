// bloglist-frontend/src/store/reducers/notificationReducer.js
const initialState = { message: null, type: null };

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { message: action.data.message, type: action.data.type };
    case 'CLEAR_NOTIFICATION':
      return { message: null, type: null };
    default:
      return state;
  }
};

export const setNotification = (message, type, timeout = 5000) => {
  return async (dispatch) => {
    dispatch({ type: 'SET_NOTIFICATION', data: { message, type } });
    setTimeout(() => dispatch({ type: 'CLEAR_NOTIFICATION' }), timeout);
  };
};

export default notificationReducer;