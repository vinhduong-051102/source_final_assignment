import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  listLesson: [],
  listResult: []
};

const lessonSlice = createSlice({
  name: 'learn',
  initialState,
  reducers: {
    actionEnd: (state) => {
      state.isLoading = false;
    },
    actionStart: (state) => {
      state.isLoading = true;
    },
    getListLessonSuccess: (state, action) => {
      state.listLesson = action.payload;
    },
    getListResultSuccess: (state, action) => {
      state.listResult = action.payload;
    },
  },
});

export const selectIsLoading = (state) => state.learnReducer.isLoading;

export const selectListLesson = (state) => state.learnReducer.listLesson;

export const selectListResult = (state) => state.learnReducer.listResult;

export default lessonSlice.reducer;
