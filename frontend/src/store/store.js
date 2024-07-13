import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './slices/postsSlice';
import tagsReducer from './slices/tagsSlice';
import authReducer from './slices/authSlice';
import commentsReducer from './slices/commentsSlice';
import profilesReducer from './slices/profileSlice';
import titlesReducer from './slices/titlesSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    profiles: profilesReducer,
    posts: postsReducer,
    titles: titlesReducer,
    tags: tagsReducer,
    comments: commentsReducer,
  },
});

export default store;
