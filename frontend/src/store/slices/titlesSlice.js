import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTitles = createAsyncThunk(
  '/posts/fetchAllTitles',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('/api/posts/titles');

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

const titlesSlice = createSlice({
  name: 'titles',
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
    // Get titles
    builder.addCase(fetchTitles.pending, (state) => {
      titlesSlice.caseReducers.setLoading(state);
    });
    builder.addCase(fetchTitles.fulfilled, (state, action) => {
      state.items = action.payload ? action.payload : [];
      state.status = 'loaded';
    });
    builder.addCase(fetchTitles.rejected, (state, action) => {
      titlesSlice.caseReducers.setLoading(state, action);
    });
  },
});

export default titlesSlice.reducer;

export const { setError, setLoading } = titlesSlice.actions;
