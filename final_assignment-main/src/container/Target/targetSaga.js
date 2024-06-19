import { takeLatest, put, call, debounce } from 'redux-saga/effects';
import * as constants from './constants';
import * as actions from './actions';
import axios from 'axios';

function* getListTarget(action) {
  const path = `http://localhost:8080/api/v1/target/get_list_target?user_id=${action.payload}`;
  yield put(actions.actionStart());
  try {
    const res = yield call(axios.get, path);
    if (res.status === 200) {
      yield put(actions.getListTargetSuccess(res.data.listTarget));
      yield put(actions.actionEnd());
    }
  } catch (error) {
    yield put(actions.actionEnd());
  }
}

function* createTarget(action) {
  const path = `http://localhost:8080/api/v1/target/create_target`;
  yield put(actions.actionStart());
  try {
    const res = yield call(axios.post, path, action.payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.status === 200) {
      const getCookie = (name) => {
        let nameEQ = name + '=';
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
          let cookie = cookies[i];
          while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1, cookie.length);
          }
          if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length, cookie.length);
          }
        }
        return null;
      };
      const userId = +getCookie('id');
      alert(res.data.message);
      yield put(actions.getListTarget(userId));
      yield put(actions.actionEnd());
    }
  } catch (error) {
    yield put(actions.actionEnd());
  }
}

function* editTarget(action) {
  const path = `http://localhost:8080/api/v1/target/edit_target`;
  yield put(actions.actionStart());
  try {
    const res = yield call(axios.post, path, action.payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.status === 200) {
      const getCookie = (name) => {
        let nameEQ = name + '=';
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
          let cookie = cookies[i];
          while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1, cookie.length);
          }
          if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length, cookie.length);
          }
        }
        return null;
      };
      const userId = +getCookie('id');
      alert(res.data.message);
      yield put(actions.getListTarget(userId));
      yield put(actions.actionEnd());
    }
  } catch (error) {
    yield put(actions.actionEnd());
  }
}

function* deleteTarget(action) {
  const path = `http://localhost:8080/api/v1/target/delete_target?target_id=${action.payload}`;
  yield put(actions.actionStart());
  try {
    const res = yield call(axios.delete, path);
    if (res.status === 200) {
      const getCookie = (name) => {
        let nameEQ = name + '=';
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
          let cookie = cookies[i];
          while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1, cookie.length);
          }
          if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length, cookie.length);
          }
        }
        return null;
      };
      const userId = +getCookie('id');
      alert(res.data.message);
      yield put(actions.getListTarget(userId));
      yield put(actions.actionEnd());
    }
  } catch (error) {
    yield put(actions.actionEnd());
  }
}

function* getTarget(action) {
  const { userId, dayOfWeek } = action.payload
  const path = `http://localhost:8080/api/v1/target/get_target?user_id=${userId}&day_of_week=${dayOfWeek}`;
  yield put(actions.actionStart());
  try {
    const res = yield call(axios.get, path);
    if (res.status === 200) {
      yield put(actions.getTargetSuccess(res.data.target));
      yield put(actions.actionEnd());
    }
  } catch (error) {
    yield put(actions.actionEnd());
  }
}

export default function* () {
  yield takeLatest(constants.GET_LIST_TARGET_ACTION, getListTarget);
  yield takeLatest(constants.CREATE_TARGET_ACTION, createTarget);
  yield takeLatest(constants.EDIT_TARGET_ACTION, editTarget);
  yield takeLatest(constants.DELETE_TARGET_ACTION, deleteTarget);
  yield takeLatest(constants.GET_TARGET_ACTION, getTarget);
}
