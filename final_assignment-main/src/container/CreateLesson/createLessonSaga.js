import { takeLatest, put, call, debounce } from 'redux-saga/effects';
import * as constants from './constants';
import * as actions from './actions';
import axios from 'axios';
import { aiUrl } from '../../constants/urls';

function* getListSuggestWord(action) {
  const path = `${aiUrl}/suggest_word`;
  yield put(actions.actionStart());
  try {
    const res = yield call(axios.post, path, action.payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.status === 200) {
      yield put(actions.getSuggestWordSuccess(res.data));
      yield put(actions.actionEnd());
    }
  } catch (error) {
    yield put(actions.actionEnd());
  }
}

function* getListSuggestMeaning(action) {
  const path = `${aiUrl}/translate`;
  yield put(actions.actionStart());
  try {
    const res = yield call(axios.post, path, action.payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.status === 200) {
      yield put(actions.getSuggestMeaningSuccess(res.data));
      yield put(actions.actionEnd());
    }
  } catch (error) {
    yield put(actions.actionEnd());
  }
}

function* createLesson(action) {
  const path = 'http://localhost:8080/api/v1/lesson/create';
  yield put(actions.actionStart());
  try {
    const res = yield call(axios.post, path, action.payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    yield put(actions.createLessonSuccess(res.data.message));
    yield put(actions.actionEnd());
  } catch (error) {
    yield put(actions.createLessonSuccess(error.response.data.message));
    yield put(actions.actionEnd());
  }
}

export default function* () {
  yield takeLatest(constants.CREATE_LESSON_ACTION, createLesson);
  yield debounce(500, constants.GET_SUGGEST_WORD_ACTION, getListSuggestWord);
  yield debounce(
    500,
    constants.GET_SUGGEST_MEANING_ACTION,
    getListSuggestMeaning
  );
}
