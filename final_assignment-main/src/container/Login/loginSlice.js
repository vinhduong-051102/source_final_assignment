import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  message: '',
  isLoginSuccess: false,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    actionEnd: (state) => {
      state.isLoading = false;
    },
    actionStart: (state) => {
      state.isLoading = true;
    },
    resetRedux: (state) => {
      state.isLoading = false;
      state.message = '';
    },
    signinSuccess: (state, action) => {
      state.message = action.payload;
      state.isLoginSuccess = true;
    },
    signinFailure: (state, action) => {
      state.message = action.payload;
      state.isLoginSuccess = false;
    },
  },
});

export const selectIsLoading = (state) => state.loginReducer.isLoading;

export const selectMessage = (state) => state.loginReducer.message;

export const selectIsLoginSuccess = (state) =>
  state.loginReducer.isLoginSuccess;

export default loginSlice.reducer;
