import { createAction } from '@reduxjs/toolkit';
import * as constants from './constants';

export const actionStart = createAction(constants.ACTION_START);

export const actionEnd = createAction(constants.ACTION_END);

export const getListWord = createAction(constants.GET_LIST_WORD_ACTION);

export const getListWordSuccess = createAction(constants.GET_LIST_WORD_SUCCESS);

export const getQuestion = createAction(constants.GET_QUESTION_ACTION);

export const getQuestionSuccess = createAction(constants.GET_QUESTION_SUCCESS);

export const getVoice = createAction(constants.GET_VOICE_ACTION);

export const getVoiceSuccess = createAction(constants.GET_VOICE_SUCCESS);

export const resetRedux = createAction(constants.RESET_REDUX);

export const record = createAction(constants.RECORD_ACTION);

export const recordSuccess = createAction(constants.RECORD_SUCCESS);

export const getSpeakScore = createAction(constants.GET_SPEAK_SCORE_ACTION);

export const getSpeakScoreSuccess = createAction(
  constants.GET_SPEAK_SCORE_SUCCESS
);

export const markComplete = createAction(constants.MARK_COMPLETE_ACTION);

export const markCompleteSuccess = createAction(
  constants.MARK_COMPLETE_SUCCESS
);

export const createResult = createAction(constants.CREATE_RESULT_ACTION);

export const createResultSuccess = createAction(
  constants.CREATE_RESULT_SUCCESS
);
