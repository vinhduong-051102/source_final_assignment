import { takeLatest, put, call, debounce } from 'redux-saga/effects';
import * as constants from './constants';
import * as actions from './actions';
import axios from 'axios';
import { aiUrl } from '../../constants/urls';

function* getListWord(action) {
  const path = `http://localhost:8080/api/v1/lesson/get_list_word?lesson_id=${action.payload.lessonId}`;
  yield put(actions.actionStart());
  try {
    const res = yield call(axios.get, path);
    if (res.status === 200) {
      const { lessonList } = res.data;
      yield put(actions.getListWordSuccess(lessonList));
      yield put(actions.actionEnd());
    }
  } catch (error) {
    yield put(actions.actionEnd());
  }
}

function* getListQuestion(action) {
  const path = `${aiUrl}/get_question`;
  yield put(actions.actionStart());
  try {
    const res = yield call(axios.post, path, action.payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.status === 200) {
      yield put(actions.getQuestionSuccess(res.data));
      yield put(actions.actionEnd());
    }
  } catch (error) {
    yield put(actions.actionEnd());
  }
}

function* getVoice(action) {
  const path = `${aiUrl}/get_voice_by_word`;
  yield put(actions.actionStart());
  try {
    const res = yield call(axios.post, path, action.payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.status === 200) {
      const base64String = res.data['base64'];
      // Chuyển đổi base64 thành ArrayBuffer
      const arrayBuffer = Uint8Array.from(atob(base64String), (c) =>
        c.charCodeAt(0)
      ).buffer;

      // Tạo Blob từ ArrayBuffer
      const blob = new Blob([arrayBuffer], { type: 'audio/mp3' });

      // Tạo URL cho Blob
      const blobUrl = URL.createObjectURL(blob);
      yield put(actions.getVoiceSuccess(blobUrl));
      yield put(actions.actionEnd());
    }
  } catch (error) {
    yield put(actions.actionEnd());
  }
}

function* record(action) {
  const path = `${aiUrl}/record`;
  yield put(actions.actionStart());
  try {
    const formData = new FormData();
    formData.append('audio', action.payload);
    const res = yield call(axios.post, path, formData);
    if (res.status === 200) {
      yield put(actions.recordSuccess(res.data.data));
      yield put(actions.actionEnd());
    }
  } catch (error) {
    yield put(actions.actionEnd());
  }
}

function* getSpeakScore(action) {
  const path = `${aiUrl}/score`;
  yield put(actions.actionStart());
  try {
    const res = yield call(axios.post, path, action.payload);
    if (res.status === 200) {
      yield put(actions.getSpeakScoreSuccess(res.data.data));
      yield put(actions.actionEnd());
    }
  } catch (error) {
    yield put(actions.actionEnd());
  }
}

function* markComplete(action) {
  const path = `http://localhost:8080/api/v1/lesson/mark_complete`;

  yield put(actions.actionStart());
  try {
    const res = yield call(axios.put, path, action.payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.status === 200) {
      yield put(actions.markCompleteSuccess(res.data.message));
      yield put(actions.actionEnd());
    }
  } catch (error) {
    yield put(actions.actionEnd());
  }
}

function* createResult(action) {
  const path = `http://localhost:8080/api/v1/result/create_result`;
  try {
    const res = yield call(axios.post, path, action.payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {}
}

export default function* () {
  yield takeLatest(constants.GET_LIST_WORD_ACTION, getListWord);
  yield takeLatest(constants.GET_QUESTION_ACTION, getListQuestion);
  yield takeLatest(constants.GET_VOICE_ACTION, getVoice);
  yield takeLatest(constants.RECORD_ACTION, record);
  yield takeLatest(constants.GET_SPEAK_SCORE_ACTION, getSpeakScore);
  yield takeLatest(constants.MARK_COMPLETE_ACTION, markComplete);
  yield takeLatest(constants.CREATE_RESULT_ACTION, createResult);
}
