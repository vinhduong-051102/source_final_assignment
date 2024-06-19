import { takeLatest, put, call, debounce } from 'redux-saga/effects';
import * as constants from './constants';
import * as actions from './actions';
import axios from 'axios';

function setCookie(name, value, days) {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

function* signin(action) {
  const path = 'http://localhost:8080/api/v1/user/signin';
  yield put(actions.actionStart());
  try {
    const res = yield call(axios.post, path, action.payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.status === 200) {
      setCookie('userName', res.data.userName, 1);
      setCookie('id', res.data.id, 1);
      if (res.data.userName && res.data.id) {
        yield put(actions.signinSuccess(res.data.message));
      } else {
        yield put(actions.signinFailure(res.data.message));
      }
      yield put(actions.actionEnd());
    }
  } catch (error) {
    yield put(actions.actionEnd());
  }
}

export default function* () {
  yield takeLatest(constants.SIGN_IN_ACTION, signin);
}
