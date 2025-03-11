// bloglist-frontend/src/store/reducers/blogReducer.js
const initialState = [];

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_BLOGS':
      return action.data.sort((a, b) => b.likes - a.likes);
    case 'ADD_BLOG':
      return [...state, action.data].sort((a, b) => b.likes - a.likes);
    case 'UPDATE_BLOG':
      return state
        .map((blog) => (blog.id === action.data.id ? action.data : blog))
        .sort((a, b) => b.likes - a.likes);
    case 'DELETE_BLOG':
      return state
        .filter((blog) => blog.id !== action.data.id)
        .sort((a, b) => b.likes - a.likes);
    default:
      return state;
  }
};

export const initializeBlogs = () => {
  return async (dispatch, getState) => {
    const { user } = getState();
    if (user) {
      const blogs = await blogService.getAll();
      dispatch({ type: 'SET_BLOGS', data: blogs });
    }
  };
};

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    const blog = await blogService.create(blogObject);
    dispatch({ type: 'ADD_BLOG', data: blog });
    dispatch(
      setNotification(
        `a new blog ${blog.title} by ${blog.author} added`,
        'success'
      )
    );
  };
};

export const updateBlog = (id, updatedBlog) => {
  return async (dispatch) => {
    const blog = await blogService.update(id, updatedBlog);
    dispatch({ type: 'UPDATE_BLOG', data: blog });
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);
    dispatch({ type: 'DELETE_BLOG', data: { id } });
  };
};

export default blogReducer;
