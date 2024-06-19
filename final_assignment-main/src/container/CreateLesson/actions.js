import { createAction } from '@reduxjs/toolkit';
import * as constants from './constants';

export const actionStart = createAction(constants.ACTION_START);

export const actionEnd = createAction(constants.ACTION_END);

export const getSuggestWord = createAction(constants.GET_SUGGEST_WORD_ACTION);

export const getSuggestWordSuccess = createAction(
  constants.GET_SUGGEST_WORD_SUCCESS
);

export const getSuggestMeaning = createAction(
  constants.GET_SUGGEST_MEANING_ACTION
);

export const getSuggestMeaningSuccess = createAction(
  constants.GET_SUGGEST_MEANING_SUCCESS
);

export const clearSuggest = createAction(constants.CLEAR_SUGGEST_ACTION);

export const createLesson = createAction(constants.CREATE_LESSON_ACTION);

export const createLessonSuccess = createAction(
  constants.CREATE_LESSON_SUCCESS
);
