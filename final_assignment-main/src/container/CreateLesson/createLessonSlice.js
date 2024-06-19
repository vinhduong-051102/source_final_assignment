import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  listSuggestWord: [],
  listSuggestMeaning: [],
  message: '',
};

const createLessonSlice = createSlice({
  name: 'createLesson',
  initialState,
  reducers: {
    actionEnd: (state) => {
      state.isLoading = false;
    },
    actionStart: (state) => {
      state.isLoading = true;
    },
    getSuggestWordSuccess: (state, action) => {
      state.listSuggestWord = action.payload;
    },
    getSuggestMeaningSuccess: (state, action) => {
      state.listSuggestMeaning = action.payload;
    },
    clearSuggest: (state) => {
      state.listSuggestWord = [];
      state.listSuggestMeaning = [];
    },
    createLessonSuccess: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const selectIsLoading = (state) => state.createLessonReducer.isLoading;

export const selectListSuggestWord = (state) =>
  state.createLessonReducer.listSuggestWord;

export const selectListSuggestMeaning = (state) =>
  state.createLessonReducer.listSuggestMeaning;

export const selectMessage = (state) => state.createLessonReducer.message;

export default createLessonSlice.reducer;
