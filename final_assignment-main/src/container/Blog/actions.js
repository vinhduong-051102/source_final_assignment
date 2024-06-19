import { createAction } from '@reduxjs/toolkit';
import * as constants from './constants';

export const actionStart = createAction(constants.ACTION_START);

export const actionEnd = createAction(constants.ACTION_END);

export const getListBlog = createAction(constants.GET_LIST_BLOG_ACTION);

export const getListBlogSuccess = createAction(constants.GET_LIST_BLOG_SUCCESS);

export const getDetailBlog = createAction(constants.GET_DETAIL_BLOG_ACTION);

export const getDetailBlogSuccess = createAction(
  constants.GET_DETAIL_BLOG_SUCCCESS
);

export const getListRelativeBlog = createAction(
  constants.GET_LIST_RELATIVE_BLOG_ACTION
);

export const getListRelativeBlogSuccess = createAction(
  constants.GET_LIST_RELATIVE_BLOG_SUCCESS
);

export const createComment = createAction(constants.CREATE_COMMENT_ACTION);

export const createCommentSuccess = createAction(
  constants.CREATE_COMMENT_SUCCESS
);

export const getListComment = createAction(constants.GET_LIST_COMMENT_ACTION);

export const getListCommentSuccess = createAction(
  constants.GET_LIST_COMMENT_SUCCESS
);

export const getListSuggestBlog = createAction(
  constants.GET_LIST_SUGGEST_BLOG_ACTION
);

export const getListSuggestBlogSuccess = createAction(
  constants.GET_LIST_SUGGEST_BLOG_SUCCESS
);
