import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTags = createAsyncThunk(
  'tags/fetchAllTags',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('/api/tags');
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

const tagsSlice = createSlice({
  name: 'tags',
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
    builder.addCase(fetchTags.pending, (state) => {
      tagsSlice.caseReducers.setLoading(state);
    });
    builder.addCase(fetchTags.fulfilled, (state, action) => {
      state.items = action.payload ? action.payload : [];
      state.status = 'loaded';
    });
    builder.addCase(fetchTags.rejected, (state, action) => {
      tagsSlice.caseReducers.setError(state, action);
    });
  },
});

export default tagsSlice.reducer;

export const { setLoading, setError } = tagsSlice.actions;
