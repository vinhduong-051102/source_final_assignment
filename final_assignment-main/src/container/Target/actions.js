import { createAction } from '@reduxjs/toolkit';
import * as constants from './constants';

export const actionStart = createAction(constants.ACTION_START);

export const actionEnd = createAction(constants.ACTION_END);

export const getListTarget = createAction(constants.GET_LIST_TARGET_ACTION);

export const getListTargetSuccess = createAction(
  constants.GET_LIST_TARGET_SUCCESS
);

export const createTarget = createAction(constants.CREATE_TARGET_ACTION);

export const createTargetSuccess = createAction(
  constants.CREATE_TARGET_SUCCESS
);

export const editTarget = createAction(constants.EDIT_TARGET_ACTION);

export const editTargetSuccess = createAction(constants.EDIT_TARGET_SUCCESS);

export const deleteTarget = createAction(constants.DELETE_TARGET_ACTION);

export const deleteTargetSuccess = createAction(
  constants.DELETE_TARGET_SUCCESS
);

export const getTarget = createAction(constants.GET_TARGET_ACTION)

export const getTargetSuccess = createAction(constants.GET_TARGET_SUCCESS)
