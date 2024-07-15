import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchComments = createAsyncThunk(
  'comments/fetchAllComments',
  async ({ sortBy, postId }, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `/api/comments/?sortBy=${sortBy}&postId=${postId ? postId : ''}`
      );
      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchAddComment = createAsyncThunk(
  'comments/fetchComment',
  async (comment, thunkAPI) => {
    try {
      const { data } = await axios.post(`/api/comments`, comment);
      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  status: 'idle',
  error: null,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setLoading(state) {
      state.status = 'loading';
      state.items = [];
      state.error = null;
    },
    setError(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Get comments
    builder.addCase(fetchComments.pending, (state) => {
      commentsSlice.caseReducers.setLoading(state);
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.items = action.payload ? action.payload : [];
      state.status = 'loaded';
    });
    builder.addCase(fetchComments.rejected, (state, action) => {
      commentsSlice.caseReducers.setError(state, action);
    });
    // Post comment
    builder.addCase(fetchAddComment.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchAddComment.fulfilled, (state, action) => {
      state.items.push(action.payload);
      state.status = 'loaded';
    });
    builder.addCase(fetchAddComment.rejected, (state) => {
      state.status = 'error';
    });
  },
});

export default commentsSlice.reducer;

export const { setError, setLoading } = commentsSlice.actions;
