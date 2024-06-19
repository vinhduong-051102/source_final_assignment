import { createAction } from '@reduxjs/toolkit';
import * as constants from './constants';

export const actionStart = createAction(constants.ACTION_START);

export const actionEnd = createAction(constants.ACTION_END);

export const getListLesson = createAction(constants.GET_LIST_LESSON_ACTION);

export const getListLessonSuccess = createAction(
  constants.GET_LIST_LESSON_SUCCESS
);

export const getListResult = createAction(constants.GET_LIST_RESULT_ACTION);

export const getListResultSuccess = createAction(
  constants.GET_LIST_RESULT_SUCCESS
);
