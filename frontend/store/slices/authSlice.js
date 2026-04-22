import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const loginAdmin = createAsyncThunk('auth/loginAdmin', async (credentials, thunkAPI) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    if (response.data.token) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('adminToken', response.data.token);
      }
    }
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message || 'Login failed');
  }
});

const initialState = {
  token: typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('adminToken');
      }
    },
    checkAuth: (state) => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('adminToken');
        if (token) {
          state.isAuthenticated = true;
          state.token = token;
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, checkAuth } = authSlice.actions;
export default authSlice.reducer;
