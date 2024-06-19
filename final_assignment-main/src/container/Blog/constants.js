export const KEY = 'blog';

export const ACTION_START = `${KEY}/actionStart`;

export const ACTION_END = `${KEY}/actionEnd`;

export const RESET_REDUX = `${KEY}/resetRedux`;

export const GET_LIST_BLOG_ACTION = `${KEY}/getListBlog`;

export const GET_LIST_BLOG_SUCCESS = `${KEY}/getListBlogSuccess`;

export const GET_DETAIL_BLOG_ACTION = `${KEY}/getDetailBlog`;

export const GET_DETAIL_BLOG_SUCCCESS = `${KEY}/getDetailBlogSuccess`;

export const GET_LIST_RELATIVE_BLOG_ACTION = `${KEY}/getListRelativeBlog`;

export const GET_LIST_RELATIVE_BLOG_SUCCESS = `${KEY}/getListRelativeBlogSuccess`;

export const CREATE_COMMENT_ACTION = `${KEY}/createComment`;

export const CREATE_COMMENT_SUCCESS = `${KEY}/createCommentSuccess`;

export const GET_LIST_COMMENT_ACTION = `${KEY}/getListComment`;

export const GET_LIST_COMMENT_SUCCESS = `${KEY}/getListCommentSuccess`;

export const GET_LIST_SUGGEST_BLOG_ACTION = `${KEY}/getListSuggestBlog`;

export const GET_LIST_SUGGEST_BLOG_SUCCESS = `${KEY}/getListSuggestBlogSuccess`;

export const TYPE = {
  listen: 0,
  speak: 1,
  read: 2,
  ipa: 3,
};
