import { createSlice } from '@reduxjs/toolkit';
import { getTargetSuccess } from './actions';

const initialState = {
  isLoading: false,
  message: '',
  listTarget: [],
  target: null
};

const targetSlice = createSlice({
  name: 'target',
  initialState,
  reducers: {
    actionEnd: (state) => {
      state.isLoading = false;
    },
    actionStart: (state) => {
      state.isLoading = true;
    },
    getListTargetSuccess: (state, action) => {
      state.listTarget = action.payload;
    },
    getTargetSuccess: (state, action) => {
      state.target = action.payload
    },
    resetRedux: (state) => {
      state.isLoading = false;
      state.message = '';
      state.listTarget = [];
      state.target = null
    },
  },
});

export const selectIsLoading = (state) => state.targetReducer.isLoading;

export const selectMessage = (state) => state.targetReducer.message;

export const selectListTarget = (state) => state.targetReducer.listTarget;

export const selectTarget = (state) => state.targetReducer.target;

export default targetSlice.reducer;
