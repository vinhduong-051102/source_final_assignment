import { takeEvery, put, call, takeLatest } from 'redux-saga/effects';
import * as constants from './constants';
import * as actions from './actions';
import axios from 'axios';
import { aiUrl } from '../../constants/urls';

function* getListBlog(action) {
  const path = `http://localhost:3333/items/blog?filter[type][_eq]=${action.payload}&fields=id,title,thumbnail,description,type`;
  yield put(actions.actionStart());
  try {
    const res = yield call(axios.get, path);
    if (res.status === 200) {
      yield put(
        actions.getListBlogSuccess({
          type: action.payload,
          listBlog: res.data.data,
        })
      );
      yield put(actions.actionEnd());
    }
  } catch (error) {
    yield put(actions.actionEnd());
  }
}

function* getListRelativeBlog(action) {
  const path = `http://localhost:3333/items/blog?filter[type][_eq]=${action.payload.type}&filter[id][_neq]=${action.payload.id}&fields=id,title,thumbnail,description,type`;
  yield put(actions.actionStart());
  try {
    const res = yield call(axios.get, path);
    if (res.status === 200) {
      yield put(actions.getListRelativeBlogSuccess(res.data.data));
      yield put(actions.actionEnd());
    }
  } catch (error) {
    yield put(actions.actionEnd());
  }
}

function* getDetailBlog(action) {
  const path = `http://localhost:3333/items/blog?filter[id][_eq]=${action.payload}&fields=title,content`;
  yield put(actions.actionStart());
  try {
    const res = yield call(axios.get, path);
    if (res.status === 200) {
      yield put(actions.getDetailBlogSuccess(res.data.data[0]));
      yield put(actions.actionEnd());
    }
  } catch (error) {
    yield put(actions.actionEnd());
  }
}

function* createComment(action) {
  const path = `${aiUrl}/rating`;
  yield put(actions.actionStart());
  try {
    const res = yield call(axios.post, path, action.payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.status === 200) {
      const res1 = yield call(
        axios.post,
        'http://localhost:8080/api/v1/comment/create_comment',
        { ...action.payload, rating: res.data.data },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res1.status === 200) {
        yield put(actions.getListComment(action.payload.blogId));
      }
    }
  } catch (error) {
    yield put(actions.actionEnd());
  }
}

function* getListComment(action) {
  const path = `http://localhost:8080/api/v1/comment/get_list_comment?blog_id=${action.payload}`;
  yield put(actions.actionStart());
  try {
    const res = yield call(axios.get, path);
    if (res.status === 200) {
      yield put(actions.getListCommentSuccess(res.data.list));
      yield put(actions.actionEnd());
    }
  } catch (error) {
    yield put(actions.actionEnd());
  }
}

function* getListSuggestBlog(action) {
  const path = `http://localhost:8080/api/v1/comment/get_all_comment`;
  yield put(actions.actionStart());
  try {
    const res = yield call(axios.get, path);
    if (res.status === 200) {
      const res1 = yield call(
        axios.post,
        `${aiUrl}/get_list_suggest_blog`,
        { list: res.data.list, userId: action.payload },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res1.status === 200) {
        const res2 = yield call(
          axios.get,
          `http://localhost:3333/items/blog?filter[id][_in]=${res1.data.data.join(',')}&fields=id,title,thumbnail,description,type`
        );
        if (res2.status === 200) {
          yield put(actions.getListSuggestBlogSuccess(res2.data.data));
          yield put(actions.actionEnd());
        }
      }
    }
  } catch (error) {
    yield put(actions.actionEnd());
  }
}

export default function* () {
  yield takeEvery(constants.GET_LIST_BLOG_ACTION, getListBlog);
  yield takeLatest(constants.GET_DETAIL_BLOG_ACTION, getDetailBlog);
  yield takeLatest(
    constants.GET_LIST_RELATIVE_BLOG_ACTION,
    getListRelativeBlog
  );
  yield takeLatest(constants.CREATE_COMMENT_ACTION, createComment);
  yield takeLatest(constants.GET_LIST_COMMENT_ACTION, getListComment);
  yield takeLatest(constants.GET_LIST_SUGGEST_BLOG_ACTION, getListSuggestBlog);
}
