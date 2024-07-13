import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAuth = createAsyncThunk(
  'auth/fetchAuth',
  async (params, thunkAPI) => {
    try {
      const { data } = await axios.post('/users/login', params);
      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchAuthMe = createAsyncThunk(
  'auth/fetchAuthMe',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('/users/me');
      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchRegister = createAsyncThunk(
  'auth/fetchRegister',
  async (params, thunkAPI) => {
    try {
      const { data } = await axios.post('/users/register', params);
      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchEditUser = createAsyncThunk(
  'auth/fetchEditUser',
  async ({ params, userId }, thunkAPI) => {
    try {
      const { data } = await axios.put(`/users/${userId}`, params);
      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addFavourite = createAsyncThunk(
  '/auth/addFavourite',
  async ({ id }, thunkAPI) => {
    try {
      const params = { postId: id };

      const { data } = await axios.post('/users/favourites', params);
      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteFavourite = createAsyncThunk(
  '/auth/deleteFavourite',
  async ({ id }, thunkAPI) => {
    try {
      const params = { postId: id };

      const { data } = await axios.delete('/users/favourites', {
        data: params,
      });
      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const isAuthSelector = (state) => Boolean(state.auth.user);

const initialState = {
  user: null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
    setLoading(state) {
      state.status = 'loading';
      state.user = null;
      state.error = null;
    },
    setUser(state, action) {
      state.status = 'loaded';
      state.user = action.payload;
    },
    setError(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(fetchAuth.pending, (state) => {
      authSlice.caseReducers.setLoading(state);
    });
    builder.addCase(fetchAuth.fulfilled, (state, action) => {
      authSlice.caseReducers.setUser(state, action);
    });
    builder.addCase(fetchAuth.rejected, (state, action) => {
      authSlice.caseReducers.setError(state, action);
    });
    // Check me
    builder.addCase(fetchAuthMe.pending, (state) => {
      authSlice.caseReducers.setLoading(state);
    });
    builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
      authSlice.caseReducers.setUser(state, action);
    });
    builder.addCase(fetchAuthMe.rejected, (state, action) => {
      authSlice.caseReducers.setError(state, action);
    });
    // Register
    builder.addCase(fetchRegister.pending, (state) => {
      authSlice.caseReducers.setLoading(state);
    });
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      authSlice.caseReducers.setUser(state, action);
    });
    builder.addCase(fetchRegister.rejected, (state, action) => {
      authSlice.caseReducers.setError(state, action);
    });
    // Edit
    builder.addCase(fetchEditUser.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(fetchEditUser.fulfilled, (state, action) => {
      state.user = { ...state.user, ...action.payload };
      state.status = 'loaded';
    });
    builder.addCase(fetchEditUser.rejected, (state, action) => {
      authSlice.caseReducers.setError(state, action);
    });
    // Add to favourite
    builder.addCase(addFavourite.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(addFavourite.fulfilled, (state, action) => {
      authSlice.caseReducers.setUser(state, action);
    });
    builder.addCase(addFavourite.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
    // Delete favourite
    builder.addCase(deleteFavourite.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(deleteFavourite.fulfilled, (state, action) => {
      authSlice.caseReducers.setUser(state, action);
    });
    builder.addCase(deleteFavourite.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});

export default authSlice.reducer;

export const { logout, setLoading, setUser, setError } = authSlice.actions;
