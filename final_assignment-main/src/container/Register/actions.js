import { createAction } from '@reduxjs/toolkit';
import * as constants from './constants';

export const actionStart = createAction(constants.ACTION_START);

export const actionEnd = createAction(constants.ACTION_END);

export const signup = createAction(constants.SIGN_UP_ACTION);

export const signupSuccess = createAction(constants.SIGN_UP_SUCCESS);

export const resetRedux = createAction(constants.RESET_REDUX);
