import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  message: '',
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    actionEnd: (state) => {
      state.isLoading = false;
    },
    actionStart: (state) => {
      state.isLoading = true;
    },
    signupSuccess: (state, action) => {
      state.message = action.payload;
    },
    resetRedux: (state) => {
      state.isLoading = false;
      state.message = '';
    },
  },
});

export const selectIsLoading = (state) => state.registerReducer.isLoading;

export const selectMessage = (state) => state.registerReducer.message;

export default registerSlice.reducer;
