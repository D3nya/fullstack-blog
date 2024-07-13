import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPosts = createAsyncThunk(
  'posts/fetchAllPosts',
  async (
    { sort = '', tag = '', limit = 10, skip = 0, profileId = '' },
    thunkAPI
  ) => {
    try {
      const { data, headers } = await axios.get(`/posts`, {
        params: { sortBy: sort, tag, limit, skip, findUser: profileId },
      });

      const totalCount = parseInt(headers['x-total-count'], 10);

      return { items: data, totalCount };
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchDeletePost = createAsyncThunk(
  'posts/fetchDeletePost',
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.delete(`posts/${id}`);
      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  totalCount: 0,
  skip: 0,
  limit: 3,
  status: 'idle',
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setLoading(state) {
      state.status = 'loading';
      state.error = null;
    },
    setError(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },
    resetPostsState(state) {
      state.items = [];
      state.totalCount = 0;
      state.skip = 0;
      state.limit = 3;
      state.status = 'idle';
      state.error = null;
    },
    setLimit(state, action) {
      state.limit = action.payload;
    },
    setSkip(state, action) {
      state.skip = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Get posts
    builder.addCase(fetchPosts.pending, (state) => {
      postsSlice.caseReducers.setLoading(state);
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.totalCount = action.payload.totalCount;
      state.items = [...state.items, ...action.payload.items];
      state.status = 'loaded';
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      postsSlice.caseReducers.setError(state, action);
    });
    // Delete post
    builder.addCase(fetchDeletePost.pending, (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.meta.arg);
    });
  },
});

export default postsSlice.reducer;

export const { setError, setLoading, resetPostsState, setLimit, setSkip } =
  postsSlice.actions;
