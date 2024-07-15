import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProfile = createAsyncThunk(
  'auth/fetchProfile',
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.get(`/api/users/${id}`);
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

const profilesSlice = createSlice({
  name: 'profiles',
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
    // Get profile
    builder.addCase(fetchProfile.pending, (state) => {
      profilesSlice.caseReducers.setLoading(state);
    });
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.items = action.payload ? action.payload : [];
      state.status = 'loaded';
    });
    builder.addCase(fetchProfile.rejected, (state, action) => {
      profilesSlice.caseReducers.setError(state, action);
    });
  },
});

export default profilesSlice.reducer;

export const { setError, setLoading } = profilesSlice.actions;
