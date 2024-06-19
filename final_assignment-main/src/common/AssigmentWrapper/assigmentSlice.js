import { createSlice } from '@reduxjs/toolkit';
import { markCompleteSuccess } from './actions';

const initialState = {
  isLoading: false,
  listWord: [],
  question: null,
  voiceUrl: '',
  audioText: '',
  score: null,
  completeMessage: null,
};

const assigmentSlice = createSlice({
  name: 'assigment',
  initialState,
  reducers: {
    actionEnd: (state) => {
      state.isLoading = false;
    },
    actionStart: (state) => {
      state.isLoading = true;
    },
    getListWordSuccess: (state, action) => {
      state.listWord = action.payload;
    },
    getQuestionSuccess: (state, action) => {
      state.question = action.payload;
    },
    getVoiceSuccess: (state, action) => {
      state.voiceUrl = action.payload;
    },
    recordSuccess: (state, action) => {
      state.audioText = action.payload;
    },
    getSpeakScoreSuccess: (state, action) => {
      state.score = action.payload;
    },
    markCompleteSuccess: (state, action) => {
      state.completeMessage = action.payload;
    },
    resetRedux: (state) => {
      state.isLoading = false;
      state.listWord = [];
      state.question = null;
      state.voiceUrl = '';
      state.audioText = '';
      state.score = null;
      state.completeMessage = null;
    },
  },
});

export const selectIsLoading = (state) => state.assigmentReducer.isLoading;

export const selectListWord = (state) => state.assigmentReducer.listWord;

export const selectQuestion = (state) => state.assigmentReducer.question;

export const selectVoiceUrl = (state) => state.assigmentReducer.voiceUrl;

export const selectAudioText = (state) => state.assigmentReducer.audioText;

export const selectScore = (state) => state.assigmentReducer.score;

export const selectCompleteMessage = (state) =>
  state.assigmentReducer.completeMessage;

export default assigmentSlice.reducer;
