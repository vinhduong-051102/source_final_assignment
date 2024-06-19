import { takeLatest, put, call, debounce } from 'redux-saga/effects';
import * as constants from './constants';
import * as actions from './actions';
import { axiosPost } from '../../utils/request';
import axios from 'axios';
import { aiUrl } from '../../constants/urls';

function* chat(action) {
  const path = `${aiUrl}/chat`;
  yield put(actions.actionStart());
  try {
    const res = yield call(axios.post, path, action.payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.status === 200) {
      const [first, ...rest] = res.data;
      yield put(actions.chatSuccess(rest));
      yield put(actions.actionEnd());
    }
  } catch (error) {
    yield put(actions.actionEnd());
  }
}

function* getListHistory() {
  const path = `${aiUrl}/get_history`;
  yield put(actions.actionStart());
  try {
    const res = yield call(axios.get, path);
    if (res.status === 200) {
      const [first, ...rest] = res.data;
      yield put(actions.getListHistorySuccess(rest));
      yield put(actions.actionEnd());
    }
  } catch (error) {
    yield put(actions.actionEnd());
  }
}

export default function* () {
  yield takeLatest(constants.CHAT_ACTION, chat);
  yield takeLatest(constants.GET_LIST_HISTORY_ACTION, getListHistory);
}
