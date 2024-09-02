import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    error: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    loginFailure: (state, action) => {
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;

export const loginUser = (username, password) => async (dispatch) => {
  try {
    const response = await axios.post('/api/login', { username, password });
    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(loginFailure('Login failed. Please check your credentials.'));
  }
};

export default authSlice.reducer;
