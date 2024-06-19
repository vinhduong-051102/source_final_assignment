import { takeLatest, put, call, debounce } from 'redux-saga/effects';
import * as constants from './constants';
import * as actions from './actions';
import { axiosPost } from '../../utils/request';
import axios from 'axios';

function* getListLesson(action) {
  const path = `http://localhost:8080/api/v1/lesson/get_list?user_id=${action.payload.userId}`;
  yield put(actions.actionStart());
  try {
    const res = yield call(axios.get, path);
    if (res.status === 200) {
      const { lessonList } = res.data;
      yield put(actions.getListLessonSuccess(lessonList));
      yield put(actions.actionEnd());
    }
  } catch (error) {
    yield put(actions.actionEnd());
  }
}

function* getListResult(action) {
  const path = `http://localhost:8080/api/v1/result/get_list_result?user_id=${action.payload}`;
  yield put(actions.actionStart());
  try {
    const res = yield call(axios.get, path);
    if (res.status === 200) {
      const { listResult } = res.data;
      yield put(actions.getListResultSuccess(listResult));
      yield put(actions.actionEnd());
    }
  } catch (error) {
    yield put(actions.actionEnd());
  }
}

export default function* () {
  yield takeLatest(constants.GET_LIST_LESSON_ACTION, getListLesson);
  yield takeLatest(constants.GET_LIST_RESULT_ACTION, getListResult);
}
