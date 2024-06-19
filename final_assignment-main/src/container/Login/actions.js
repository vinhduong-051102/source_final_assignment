import { createAction } from '@reduxjs/toolkit';
import * as constants from './constants';

export const actionStart = createAction(constants.ACTION_START);

export const actionEnd = createAction(constants.ACTION_END);

export const signin = createAction(constants.SIGN_IN_ACTION);

export const signinSuccess = createAction(constants.SIGN_IN_SUCCESS);

export const resetRedux = createAction(constants.RESET_REDUX);

export const signinFailure = createAction(constants.SIGN_IN_FAILURE);
