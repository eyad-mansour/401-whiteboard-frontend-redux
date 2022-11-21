import {configureStore} from '@reduxjs/toolkit';
import postsReducer from '../redux/postsSlice';
import usersReducer from '../redux/userSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
  },
});
